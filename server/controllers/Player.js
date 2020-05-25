require('../models/Player')
const mongoose = require('mongoose')
const Player = mongoose.model('player')

const playerController = {}

/*
 * Creates the house player
 */
playerController.createHousePlayer = (req, res) => {
  const id = new mongoose.Types.ObjectId()
  const housePlayer = new Player({
    _id: id,
    name: `House-${id}`,
    deck: [],
    isPlaying: true
  })
  housePlayer
    .save()
    .then((data) => {
      res.json({
        success: true,
        status: 200,
        message: 'House player created',
        response: data
      })
    })
    .catch((e) => {
      res.json({
        success: false,
        status: 500,
        response: e
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

module.exports = playerController
