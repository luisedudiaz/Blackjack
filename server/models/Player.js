const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cardSchema = mongoose.model('card').schema

const playerSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  deck: [cardSchema],
  isPlaying: {
    type: Boolean,
    required: true
  }
})

mongoose.model('player', playerSchema)
