const express  = require('express')
const router   = express.Router()
const User     = require('../../models/User')
const jwt      = require('jsonwebtoken')
const keys     = require('../../config/keys')
const passport = require('passport')

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