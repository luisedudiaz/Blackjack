const mongoose = require('mongoose')
require('../models/Game')
const gameController = {}

const Game = mongoose.model('game')

/*
 * Inserts a new game object into the db
 */
gameController.createGame = (req, res) => {
  const player = req.body.player
  const house = req.body.house
  const cards = req.body.deck

  if (!player || !house || !cards) {
    res.json({
      success: false,
      status: 422,
      message: 'Missing data to process request'
    })
  }

  const game = new Game({
    _id: new mongoose.Types.ObjectId(),
    deck: cards,
    winner: '',
    players: [house, player],
    turn: house,
    status: 1
  })

  game
    .save()
    .then((data) => {
      res.json({
        success: true,
        status: 200,
        message: 'Game created successfully',
        response: {
          id: data._id
        }
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        status: 500,
        message: 'Oh no, something went wrong!',
        response: err
      })
    })
}

module.exports = gameController
