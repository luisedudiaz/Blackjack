const randomCard = () => {
  const MAX_CARDS = 52
  return Math.floor(Math.random() * MAX_CARDS)
}

module.exports = { randomCard }
