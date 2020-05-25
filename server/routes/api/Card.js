const express = require('express')
const router = express.Router()

const card = require('../../controllers/Card')

router.get('/', card.getCards)

router.get('/', card.getCard)

module.exports = router
