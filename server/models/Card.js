const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardShema = new Schema({
  value: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
  },
  suit: {
    type: String,
    enum: ['Hearts', 'Spades', 'Diamonds', 'Clubs']
  }
})

mongoose.model('card', CardShema)
