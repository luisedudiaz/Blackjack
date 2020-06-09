require('../models/Game')
const mongoose = require('mongoose')
const { housePlayerPromise } = require('./Player')
const { deckPromise } = require('./Card')
const gameController = {}

const Game = mongoose.model('game')

/*
 * Creates game and returns its id
 */
gameController.createGame = async (req, res) => {
  const player = req.body.player
  const socket = req.body.socket
  let housePlayer = null
  let cards = null

  if (!player || !socket) {
    return res.json({
      success: false,
      status: 422,
      message: 'Missing data player data to process request'
    })
  }

  try {
    const data = await Promise.all([housePlayerPromise(), deckPromise()])
    housePlayer = data[0]
    cards = data[1]
  } catch (e) {
    res.json({
      success: false,
      status: 500,
      message:
        'Oh no! something went wrong when creating the elements for the game',
      response: { e }
    })
  }

  const game = new Game({
    _id: new mongoose.Types.ObjectId(),
    deck: cards,
    winner: '',
    players: [housePlayer, player],
    turn: housePlayer,
    status: 1,
    socket
  })

  game
    .save()
    .then((data) => {
      res.json({
        success: true,
        status: 200,
        message: 'Game created successfully',
        response: {
          id: data._id,
          house: data.players[0]
        }
      })
    })
    .catch((e) => {
      res.json({
        success: false,
        status: 500,
        message: 'Oh no, something went wrong creating the game',
        response: e
      })
    })
}

gameController.getGames = (req, res) => {
  Game.find()
    .then((data) => {
      const games = []
      data.forEach((item) => {
        games.push({ id: item._id, players: item.players.length - 1 })
      })
      return res.json({
        success: true,
        status: 200,
        games,
        empty: games.length === 0
      })
    })
    .catch(() => {
      return res.json({
        success: false,
        status: 500,
        message: 'Something went wrong'
      })
    })
}

module.exports = gameController
