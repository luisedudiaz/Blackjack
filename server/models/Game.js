const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardSchema = mongoose.model('card').schema
const playerSchema = mongoose.model('player').schema

const gameSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  deck: [cardSchema],
  winner: { type: String },
  players: [playerSchema],
  turn: playerSchema,
  status: { type: Boolean },
  socket: { type: String }
})

mongoose.model('game', gameSchema)
