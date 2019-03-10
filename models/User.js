const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const UserSchema = new Schema({
  steamId: {
    type: Number,
    required: true
  }
})

module.exports = User = mongoose.model('users', UserSchema)