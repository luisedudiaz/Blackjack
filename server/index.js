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
  const Game = mongoose.model('game')
  io.on('connection', (socket) => {
    const exitEvents = ['leftRoom', 'disconnect']
    socket.on('createConnection', () => {
      return socket.io
    })
    socket.on('joinRoom', async ({ player, idGame, room }) => {
      const game = await Game.findById(idGame)
      game.players.push(player)
      game.save()
      io.in(room).emit('updateGame', game)
      socket.broadcast
        .to(idGame)
        .emit('newMessage', `${player.name} is connected`)
    })
    socket.on('play', ({ user, game }) => {})
    socket.on('setThinkingStatus', ({ room, status, user }) => {})
    exitEvents.forEach((event) => {
      socket.on(event, () => {})
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
    console.log(e)
  }
}
start()
