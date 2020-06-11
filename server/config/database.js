module.exports =
  process.env.NODE_ENV === 'production'
    ? {
        URI:
          'mongodb+srv://luiscedeno:wMjBFAv5uXZ5kkBj@cluster0-t4ca7.mongodb.net/blackjack?retryWrites=true&w=majority'
      }
    : {
        URI:
          'mongodb+srv://luiscedeno:wMjBFAv5uXZ5kkBj@cluster0-t4ca7.mongodb.net/blackjack?retryWrites=true&w=majority'
      }
