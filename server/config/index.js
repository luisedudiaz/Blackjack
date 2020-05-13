const mongo = require('./mongo')
// const swagger = require('./swagger')

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  mongo
  // swagger
}
