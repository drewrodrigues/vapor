import * as helpers from './steamHelpers';

const express  = require('express')
const router   = express.Router()
const axios    = require('axios')
const keys = require('../../config/keys')

const steamUrl = route => {
  return `https://api.steampowered.com${route}/?key=${keys.steamAPIKey}`
}

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
  var responseData;
  var steamId = req.params.steamId;
  axios.get(steamUrl("/IPlayerService/GetOwnedGames/v1"), { params: {
      steamId,
      include_appinfo: 1,
      include_played_free_games: 1
    }})
    .then(response => {
      responseData = response.data.response.games;
      for (let i = 0; i < responseData.length; i++){
        let gameImageUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${responseData[i].appid}/${responseData[i].img_logo_url}.jpg`
        responseData[i].image_url = gameImageUrl;
      }
    })
    .then(() => {
        helpers.getIgdbIds(responseData);
    })
    .then(() => { 
        helpers.getAchievementsAndAverageTimes(responseData, steamId);
    })
    .then(() => {
        res.send(responseData);
    })
    .catch(error => {
        res.send(error);
    });
})

module.exports = router;