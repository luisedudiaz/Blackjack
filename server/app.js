const server = require('http')
const app = require('express')()
const io = require('socket.io')(server)

server.createServer(app)

// TODO: Obtener modelos de mongoose para la creacion de usuarios y salas de juego

io.on('connection', (socket) => {
  const exitEvents = ['leftRoom', 'disconnect']
  socket.on('createUser', (user) => {})
  socket.on('joinRoom', ({ user, room }) => {})
  socket.on('play', ({ user, game }) => {})
  socket.on('setThinkingStatus', ({ room, status, user }) => {})
  exitEvents.forEach((event) => {
    socket.on(event, () => {})
  })
})

module.exports = {
  app,
  server
}
