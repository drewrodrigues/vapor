const helpers = require('./steamHelpers');

const express  = require('express')
const router   = express.Router()
const axios    = require('axios')
const keys = require('../../config/keys')

const steamUrl = require('../helpers').steamUrl
const getOwnedGames = require('../helpers').getOwnedGames
const generateGamesIconUrl = require('../helpers').generateGamesIconUrl

const User = require('../../models/User')
const Game = require('../../models/Game')

// redirect to steam to authenticate
router.get("/:id", (req, res) => {
    axios({
        url: `https://store.steampowered.com/api/appdetails?appids=${req.params.id}&cc=US`,
        method: 'GET'
    })
        .then(response => {
            const game = Object.values(response.data)[0].data
            const data = {
                price_overview: game.price_overview,
                screenshots: game.screenshots,
                genres: game.genres,
                metacritic: game.metacritic,
                name: game.name,
                release_date: game.release_date,
                steam_id: game.steam_appid,
                recommendations: game.recommendations
            }
            res.json(data)
        })
        .catch(err => {
            console.error(err);
        });
})

router.get('/profile/:steamId', (req, res) => {
  axios
    .get(steamUrl("/ISteamUser/GetPlayerSummaries/v2"), { params: {
      steamids: req.params.steamId,
    }})
    .then(response => {
      return res.send(response.data.response.players[0])
    })
    .catch(error => console.log(error))
})

// Get user's owned games with player achievements and average overall playtime
router.get('/ownedGames/:steamId', (req, res) => {
  // check last updated - if within a day, respond with DB games
  // otherwise updates user's games through Steam API
  User.findOne({ steamId: req.params.steamId }).populate('games').exec((err, user) => {
    // already updated
    if (user.updatedDaysAgo === 0) {
      res.send(user.games)
    } else {
      // needs to update
      // create game records and store within user
      let responseData;
      let steamId = req.params.steamId;

      getOwnedGames(req.params.steamId)
          .then(games => {
              responseData = games.data.response.games
              generateGamesIconUrl(responseData)
              let promiseArray = [];
              helpers.getIgdbIds(responseData, promiseArray);
              return Promise.all(promiseArray).then();
          })
          .then(() => { 
              let promiseArray = [];
              helpers.getAchievementsAndAverageTimes(responseData, steamId, promiseArray);
              
              return Promise.all(promiseArray)
          })
          .then(() => {
            Game.insertMany(responseData)
            .then(docs => {
              user.games = docs
              user.updatedDaysAgo = 0
              responseData = user.games
              return user.save(err => res.send(user.games))
            })
          })
          .catch(error => {
              res.send(user.games);
          });
    }
  })
})

module.exports = router;