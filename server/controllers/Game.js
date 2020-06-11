require('../models/Game')
const mongoose = require('mongoose')
const { housePlayerPromise } = require('./Player')
require('../models/Card')
const Card = mongoose.model('card')
const gameController = {}

const Game = mongoose.model('game')

/*
 * Creates game and returns its id
 */
gameController.createGame = async (req, res) => {
  const player = req.body.player
  let housePlayer = null
  let cards = null

  if (!player) {
    return res.json({
      success: false,
      status: 422,
      message: 'Missing data player data to process request'
    })
  }

  try {
    const data = await Promise.all([housePlayerPromise()])
    housePlayer = data[0]
    cards = await Card.find({})
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
    players: [housePlayer],
    turn: housePlayer,
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

gameController.getGame = (req, res) => {
  const gameId = req.params.id
  Game.findOne({ id: gameId })
    .then((data) => {
      res.json({
        game: data
      })
    })
    .catch((err) => {
      res.json({
        error: err
      })
    })
}

gameController.updateGame = async (req, res) => {
  const gameId = req.body.gameId
  const playerId = req.body.playerId
  const card = req.body.card
  const deck = req.body.deck
  try {
    const game = await Game.findOne({ _id: gameId })
    const newPlayers = []
    let me
    game.players.forEach((player) => {
      // eslint-disable-next-line eqeqeq
      if (player._id == playerId) {
        player.deck.push(card)
        me = player
      }
      newPlayers.push(player)
    })
    const updatedGame = await Game.findOneAndUpdate(
      { _id: gameId },
      { players: newPlayers, deck },
      { new: true }
    )
    await updatedGame.save()
    res.json({
      game: updatedGame,
      player: me,
      deck
    })
  } catch (err) {
    res.json({
      error: err
    })
  }
}

module.exports = gameController
