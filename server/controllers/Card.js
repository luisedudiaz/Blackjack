const mongoose = require('mongoose')
const { randomCardNumber } = require('../utils/index')
const cardController = {}

require('../models/Card')
const Card = mongoose.model('card')

/**
 * Return all cards (52 cards).
 */
cardController.getCards = (req, res) => {}

/**
 * Return a random card.
 */
cardController.getCard = async (req, res) => {
  const randomCard = await Card.findOne().skip(randomCardNumber())
  res.json({
    randomCard
  })
}

module.exports = cardController
