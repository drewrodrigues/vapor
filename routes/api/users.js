const express  = require('express')
const router   = express.Router()
const User     = require('../../models/User')
const jwt      = require('jsonwebtoken')
const keys     = require('../../config/keys')
const passport = require('passport')

const getUserAverages = users => {
  let totalPlaytime = 0
  let totalAchievements = 0
  users.forEach(user => {
    user.games.forEach(game => {
      totalPlaytime += game.playtime_forever || 0
      totalAchievements += game.completedAchievements || 0
    })
  })
  return {
    averagePlaytime: Math.floor(totalPlaytime / users.length),
    averageAchievements: Math.floor(totalAchievements / users.length)
  }
}

router.post('/login', (req, res) => {
  User.findOne({ steamId: req.body.steamId })
    .then(user => {
      if (user) {
        signInUser(user, res)
      } else {
        const newUser = new User({ steamId: req.body.steamId })
        newUser.save()
          .then(user => signInUser(user, res))
          .catch(err => res.json(err))
      }
    })
})

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    steamId: req.user.steamId
  })
})

router.get('/stats', (req, res) => {
  User.find({}).populate('games')
    .then(users => {
      res.send(getUserAverages(users))
    })
})

router.get('/', (req, res) => {
  User.find({}).populate('games')
    .then(users => res.send(users))
})

// helpers --------------------------------------------------------------------
const signInUser = (user, res) => {
  const payload = { id: user.id, steamId: user.steamId }
  jwt.sign(
    payload,
    keys.secretOrKey,
    { expiresIn: 3600 }, // 1 hour
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      })
    }
  )
}

module.exports = router