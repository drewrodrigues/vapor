const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const GameSchema = new Schema({
  name: {
    type: String
  },
  imageUrl: {
    type: String
  },
  timePlayed: {
    type: Number,
    default: 0
  }
})

module.exports = Game = mongoose.model('games', GameSchema)