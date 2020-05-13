module.exports =
  process.env.NODE_ENV === 'production'
    ? { URI: '' }
    : { URI: 'mongodb://localhost:27017/blackjack' }
