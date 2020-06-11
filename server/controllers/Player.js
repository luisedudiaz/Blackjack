require('../models/Player')
const mongoose = require('mongoose')
const Player = mongoose.model('player')
const { randomCardNumber } = require('../utils/index')

require('../models/Card')
const Card = mongoose.model('card')

const playerController = {}

/*
 * Helper function to create the house player {Returns promise}
 */
async function createHousePromise() {
  try {
    const deck = await Card.find({})
    const cards = []
    for (let i = 0; i < 3; i++) {
      const random = randomCardNumber(deck.length)
      cards.push(deck[random])
    }
    const id = new mongoose.Types.ObjectId()
    const housePlayer = new Player({
      _id: id,
      name: 'Dealer',
      deck: cards,
      isPlaying: true
    })
    return housePlayer.save()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
  }
}

/*
 * Creates the house player
 */
playerController.createHousePlayer = (req, res) => {
  const housePlayer = createHousePromise()
  housePlayer
    .then((data) => {
      res.json({
        success: true,
        status: 200,
        message: 'House player created',
        response: data
      })
    })
    .catch((error) => {
      res.json({
        success: false,
        status: 500,
        response: error
      })
    })
}

/*
 * Return the house player
 */
playerController.getHousePlayer = (req, res) => {
  const houseId = req.query.id
  Player.findById(houseId)
    .then((data) => {
      res.json({
        success: true,
        status: 200,
        message: 'House player found, have fun',
        response: data
      })
    })
    .catch(() => {
      res.json({
        success: false,
        response: 'Something went wrong',
        status: 500
      })
    })
}

/*
 * Manages login logic
 */
playerController.login = async (req, res) => {
  try {
    const user = req.body.name
    const socket = req.body.socket
    const exists = await Player.exists({ name: user })

    if (exists) {
      const player = await Player.findOne({ name: user })
      player.socket = socket
      await player.save()
      return res.json({
        success: true,
        status: 200,
        player
      })
    } else {
      const id = new mongoose.Types.ObjectId()
      const doc = new Player({
        _id: id,
        name: user,
        deck: [],
        isPlaying: false,
        socket
      })
      const player = await doc.save()
      return res.json({
        success: true,
        status: 200,
        player
      })
    }
  } catch (e) {
    res.json({
      success: false,
      message: 'Internal server error',
      status: 500,
      response: e
    })
  }
}

/**
 * Delete user from game
 */
playerController.deletePlayerFromGame = (req, res) => {
  const id = req.params.id
  if (id) {
    try {
      // const game = await Game.findOne({ 'players._id': id })
    } catch (e) {
      res.json({
        success: false,
        message: 'Internal server error',
        status: 500,
        response: e
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Not user provided'
    })
  }
}

module.exports = {
  player: playerController,
  housePlayerPromise: createHousePromise
}
