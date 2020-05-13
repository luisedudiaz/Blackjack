const mongoose = require('mongoose')
const consola = require('consola')
const db = require('./database')

const init = async () => {
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', true)
  try {
    await mongoose.connect(db.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    consola.ready({
      message: `MongoDB Connected`,
      badge: true
    })
  } catch (e) {
    consola.error({
      message: `Connection error: ${e}`,
      badge: true
    })
  }
}

module.exports = { init }
