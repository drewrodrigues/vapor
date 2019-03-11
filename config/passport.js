const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt  = require('passport-jwt').ExtractJwt
const mongoose    = require('mongoose')
const User        = mongoose.model('users')
const keys        = require('../config/keys')
const SteamStrategy = require('passport-steam')

const options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
options.secretOrKey = keys.secretOrKey

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user)
        }
        return done(null, false)
      })
      .catch(err => console.log(err))
  }))

  passport.use(new SteamStrategy({
      returnURL: 'http://localhost:5000/api/auth/steam/return',
      realm: 'http://localhost:5000',
      apiKey: '138845E97356105CA860A2396372660C'
    },
    (identifier, profile, done) => {
      const steamId = profile._json.steamid
      User.findOne({ steamId: steamId })
        .then(user => {
          if (user) {
            return done(null, user)
          } else {
            const newUser = new User({ steamId: steamId })
            newUser.save()
              .then(user => done(null, user))
              .catch(err => done(null, false))
          }
        })
    }
  ))

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}