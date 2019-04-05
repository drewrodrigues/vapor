const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const Game = require('./Game')

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
  games: [{ type: Schema.Types.ObjectId, ref: 'games' }],
  updatedDaysAgo: { type: Number, default: 1 }
})

module.exports = User = mongoose.model('users', UserSchema)