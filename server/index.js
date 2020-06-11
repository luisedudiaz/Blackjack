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
  io.on('connection', (socket) => {
    socket.on('joinRoom', async ({ player, idGame }) => {
      console.log(idGame)
      if (player && idGame) {
        socket.join(idGame)
        try {
          const game = await Game.findById(idGame)
          console.log(game)
          if (game) {
            const games = await Game.find({})
            console.log(games)
            game.players.push(player)
            await game.save()
            io.to(idGame).emit('updateGame', game)
            const rooms = []
            games.forEach((game) => {
              rooms.push({
                id: game._id,
                players: game.players.length - 1
              })
            })
            socket.broadcast.emit('updateTable', rooms)
            socket.emit('newMessage', 'EMIT')
            socket.broadcast.to(idGame).emit('newMessage', 'BROADCAST')
          } else {
            console.log(1)
            socket.emit('redirect')
          }
        } catch (e) {
          console.log(e)
          console.log(2)
          socket.emit('redirect')
        }
      } else {
        console.log(3)
        socket.emit('redirect')
      }
    })

    socket.on('changeTurn', async ({ game, oldIndex, newIndex }) => {
      socket.join(game)
      try {
        console.log(oldIndex, newIndex)
        const g = await Game.findById(game)
        g.players[oldIndex].isPlaying = false
        g.players[newIndex].isPlaying = true
        g.turn = g.players[newIndex]
        await g.save()
        if (newIndex === g.players.length) {
          io.to(game).emit('updateTurn', { newIndex, game, g, turn: g.turn })
        } else {
          io.to(game).emit('updateTurn', { newIndex, game, g, turn: g.turn })
        }
      } catch (e) {
        console.log(e)
      }
    })

    socket.on('setTypingStatus', ({ room, typingStatus, id }) => {
      /* usersDB.setTypingStatus(id, typingStatus)
      // io.to(room).emit('updateUsers', usersDB.getUsersByRoom(room)) */
    })

    const exitEvents = ['leftRoom', 'disconnect']

    exitEvents.forEach((event) => {
      socket.on(event, async (id) => {
        console.log(id)
        try {
          try {
            const game = await Game.findOne({ 'players._id': id })
            console.log(game)
            if (game.players) {
              game.players.pull({ _id: id })
              await game.save()
              try {
                const games = await Game.find({})
                const rooms = []
                games.forEach((game) => {
                  rooms.push({
                    id: game._id,
                    players: game.players.length - 1
                  })
                })
                io.to(game._id).emit('updateGame', game)
                io.emit('updateTable', rooms)
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
