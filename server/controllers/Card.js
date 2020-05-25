const mongoose = require('mongoose')
const { randomCardNumber } = require('../utils/index')
const cardController = {}

require('../models/Card')
// eslint-disable-next-line no-unused-vars
const Card = mongoose.model('card')

/**
 * Return all cards (52 cards).
 */
cardController.getCards = (req, res) => {
  res.send('hi')
}

/**
 * Return a random card.
 */
cardController.getCard = (req, res) => {
  const deck = req.body.deck
  if (deck) {
    const random = randomCardNumber(deck.length)
    res.json({
      deck: deck[random]
    })
  }
}

module.exports = cardController
