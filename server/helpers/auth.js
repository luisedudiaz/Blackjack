const axios = require('axios')
// const mongoose = require('mongoose')

// require('../models/Player')
// const User = mongoose.model('user')

const allowIfLoggedin = (req, res, next) => {
  let token = req.headers.authorization || ''
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (token) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`
      )
      .then(
        /* async */ (r) => {
          // const email = r.data.email
          // req.user = await User.findOne({ email })
          next()
        }
      )
      .catch(() => {
        // Invalid token.
        return res.status(401).send({
          success: false,
          error: {
            name: 'Unauthorized',
            code: 401,
            message: 'Auth token is not valid'
          }
        })
      })
  } else {
    return res.status(404).send({
      success: false,
      error: {
        name: 'Not Found',
        code: 404,
        message: 'Not Found'
      }
    })
  }
}

module.exports = { allowIfLoggedin }
