const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardSchema = mongoose.model('card').schema
const playerSchema = mongoose.model('player').schema

const gameSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  deck: [cardSchema],
  winner: playerSchema,
  players: [playerSchema],
  turn: playerSchema,
  status: { type: Boolean }
})

mongoose.model('game', gameSchema)
