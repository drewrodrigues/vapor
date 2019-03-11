const express  = require('express')
const router   = express.Router()
const User     = require('../../models/User')
const jwt      = require('jsonwebtoken')
const keys     = require('../../config/keys')
const passport = require('passport')

// redirect to steam to authenticate
router.get('/steam', passport.authenticate('steam'))

// once authenticated, sign in & redirect to dashboard
router.get('/steam/return', passport.authenticate('steam'), (req, res) => {
  signInUser(req.user, res)
})

// get current user
router.get('/current', passport.authenticate('jwt'), (req, res) => {
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
      res.redirect("http://localhost:3000?token=" + "Bearer " + token)
    }
  )
}

module.exports = router