const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const Game = require('./Game')

const oneWeekInMiliseconds = 604800000

const UserSchema = new Schema({
  name: {
    type: String
  },
  ign: {
    type: String
  },
  steamId: {
    type: Number,
    required: true
  },
  totalTimePlayed: {
    type: Number,
    default: 0
  },
  games: [{ type: Schema.Types.ObjectId, ref: 'games' }],
  updated: { type: Date, default: Date.now - oneWeekInMiliseconds }
})

module.exports = User = mongoose.model('users', UserSchema)