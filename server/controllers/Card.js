const mongoose = require('mongoose')
const { randomCardNumber } = require('../utils/index')
const cardController = {}

require('../models/Card')
const Card = mongoose.model('card')

const SUITS = ['Hearts', 'Spades', 'Diamonds', 'Clubs']
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

/**
 * Return all cards (52 cards).
 */
cardController.getDeck = async (req, res) => {
  try {
    const deck = await Card.find({})
    return res.json({
      success: true,
      message: 'Deck for new game',
      response: { deck }
    })
  } catch (e) {
    res.json({
      success: false,
      message: 'Deck not found.',
      response: e
    })
  }
}

/**
 * Return a random card.
 */
cardController.getCard = (req, res) => {
  const deck = req.body.deck
  if (deck) {
    const random = randomCardNumber(deck.length)
    res.json({
      success: true,
      message: 'Random card',
      response: { card: deck[random] }
    })
  } else {
    res.json({
      success: false,
      message: 'Deck not provided'
    })
  }
}

cardController.createDeck = async (req, res) => {
  try {
    const deck = await Card.find({})
    if (deck.length === 0) {
      SUITS.forEach((suit) => {
        NUMBERS.forEach(async (value) => {
          const card = new Card({
            value,
            suit
          })
          try {
            await card.save()
          } catch (e) {
            res.json({
              success: false,
              message: 'Card not created.'
            })
          }
        })
      })
      res.json({
        success: true,
        message: 'Deck already created'
      })
    } else {
      res.json({
        success: false,
        message: 'Deck already created'
      })
    }
  } catch (e) {
    res.json({
      success: false,
      message: '',
      response: e
    })
  }
}

module.exports = cardController
