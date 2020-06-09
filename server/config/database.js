module.exports =
  process.env.NODE_ENV !== 'production'
    ? {
        URI:
          'mongodb+srv://<username>:<password>@cluster0-t4ca7.mongodb.net/blackjack?retryWrites=true&w=majority'
      }
    : { URI: 'mongodb://localhost:27017/blackjack' }
