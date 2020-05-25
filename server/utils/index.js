const randomCardNumber = (deckLength) => {
  return Math.floor(Math.random() * deckLength)
}

module.exports = { randomCardNumber }
