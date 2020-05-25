require('../models/Player')
const mongoose = require('mongoose')
const Player = mongoose.model('player')

const playerController = {}

/*
 * Creates the house player
 */
playerController.createHousePlayer = (req, res) => {
  const housePlayer = new Player({
    _id: new mongoose.Types.ObjectId(),
    name: 'House',
    deck: [],
    isPlaying: true
  })
  housePlayer
    .save()
    .then(() => {
      res.status(200).send({
        success: true,
        response: 'House player created'
      })
    })
    .catch((e) => {
      res.status(500).send({
        success: false,
        response: e
      })
    })
}

/*
 * Return the house player
 */
playerController.getHousePlayer = (req, res) => {
  Player.findOne({ name: 'House' })
    .then((player) => {
      res.status(200).send({
        success: true,
        response: player
      })
    })
    .catch(() => {
      res.status(500).send({
        success: false,
        response: 'Something went wrong'
      })
    })
}

module.exports = playerController
