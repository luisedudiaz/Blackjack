/* eslint-disable import/order */
const consola = require('consola')
const bodyParser = require('body-parser')
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')

// Import and Set Nuxt.js options
const { dev, mongo } = require('./config/index')
config.dev = dev

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  await nuxt.ready()

  // Build only in dev mode
  if (dev) {
    const builder = new Builder(nuxt)
    // const swagger = require('./routes/api/v1.0.0/swagger')
    await builder.build()
    // app.use('/api-docs', swagger)
  }

  // Bodyparser configuration
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  // Init MongoDB
  await mongo.init()

  // Routes
  const card = require('./routes/api/Card')
  const player = require('./routes/api/Player')
  const game = require('./routes/api/Game')
  app.use('/api/cards', card)
  app.use('/api/players', player)
  app.use('/api/games', game)

  // Give nuxt middleware to express
  app.use(nuxt.render)

  require('./models/Game')
  require('./models/Player')
  const Game = mongoose.model('game')
  const Player = mongoose.model('player')
  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ player, idGame }) => {
      if (player && idGame) {
        socket.join(idGame)
        try {
          const game = await Game.findOne({ _id: idGame })
          if (game) {
            const games = await Game.find({})
            game.players.push(player)
            await game.save()
            io.to(idGame).emit('updateGame', game)
            socket.broadcast.emit('updateTable', games)
            socket.emit('newMessage', 'EMIT')
            socket.broadcast.to(idGame).emit('newMessage', 'BROADCAST')
          } else {
            socket.emit('redirect')
          }
        } catch (e) {
          socket.emit('redirect')
        }
      } else {
        socket.emit('redirect')
      }
    })

    socket.on('setTypingStatus', ({ room, typingStatus, id }) => {
      // usersDB.setTypingStatus(id, typingStatus)
      // io.to(room).emit('updateUsers', usersDB.getUsersByRoom(room))
    })

    const exitEvents = ['leftRoom', 'disconnect']

    exitEvents.forEach((event) => {
      socket.on(event, async () => {
        const id = socket.id
        try {
          const user = await Player.findOne({ socket: id })
          if (user) {
            try {
              const game = await Game.findOne({ 'players._id': user._id })
              if (game.players) {
                game.players.pull({ _id: user._id })
                await game.save()
                try {
                  const games = await Game.find({})
                  io.to(game._id).emit('updateGame', game)
                  socket.broadcast.to(game._id).emit('updateTable', games)
                  socket.broadcast.to(game._id).emit('newMessage', 'BROADCAST')
                  socket.leave(game._id)
                } catch (e) {
                  console.log(e)
                }
              } else {
                socket.emit('redirect', '1')
              }
            } catch (e) {
              console.log(e)
            }
          } else {
            socket.emit('redirect', '2')
          }
        } catch (e) {
          console.log(e)
        }
      })
    })
  })

  // Listen the server
  try {
    server.listen(port, () => {
      consola.ready({
        message: `Server listening on http://${host}:${port}`,
        badge: true
      })
    })
  } catch (e) {
    consola.error({
      message: `e: ${e}`,
      badge: true
    })
  }
}
start()
