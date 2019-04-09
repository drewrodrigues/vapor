const mongoose = require('mongoose')
const Schema   = mongoose.Schema
const Game = require('./Game')

const daysAgo = n => {
  let today = new Date()
  return today.setDate(today.getDate() - n)
}

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
  updated: { type: Date, default: daysAgo(7) }
})

UserSchema.virtual('needsUpdate').get(function() {
  return this.updated <= daysAgo(1)
})

module.exports = User = mongoose.model('users', UserSchema)