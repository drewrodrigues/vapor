const express  = require('express')
const router   = express.Router()
const User     = require('../../models/User')
const jwt      = require('jsonwebtoken')
const keys     = require('../../config/keys')
const passport = require('passport')
const urls = require("../../config/urls")

// redirect to steam to authenticate
router.get('/steam', passport.authenticate('steam'))

// once authenticated, sign in & redirect to dashboard
router.get('/steam/return', passport.authenticate('steam'), (req, res) => {
  const steamId = req.query['openid.identity'].replace("https://steamcommunity.com/openid/id/", "")
  signInUser(steamId, res)
})

// get current user
router.get('/current', passport.authenticate('jwt'), (req, res) => {
  res.json({
    id: req.user.id,
    steamId: req.user.steamId
  })
})

// helpers --------------------------------------------------------------------
const signInUser = (steamId, res) => {
  const payload = { steamId }
  jwt.sign(
    payload,
    keys.secretOrKey,
    { expiresIn: 3600 }, // 1 hour
    (err, token) => {
      res.redirect(`${urls.clientUrl}?token=` + "Bearer " + token)
    }
  )
}

module.exports = router