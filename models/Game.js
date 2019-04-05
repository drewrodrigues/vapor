const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const GameSchema = new Schema({
  name: {
    type: String
  },
  appid: {
    type: Number
  },
  igdbId: {
    type: Number
  },
  image_url: {
    type: String
  },
  playtime_forever: {
    type: Number
  },
  totalAchievements: {
    type: Number
  },
  completedAchievements: {
    type: Number
  },
  avgTimePlayed: {
    type: Number
  }
})

module.exports = Game = mongoose.model('games', GameSchema)