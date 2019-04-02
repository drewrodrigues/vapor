const express  = require('express')
const router   = express.Router()
const axios    = require('axios')
const keys = require('../../config/keys');

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

// get player's achievements for a game
router.post('/player-achievements', (req, res) => {
    axios({
        url: `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${req.body.appId}&key=${keys.steamAPIKey}&steamid=${req.body.steamId}`,
        method: `GET`,
        // key: keys.steamAPIKey,
        // appid: req.body.appId,
        // steamid: req.body.steamId,
        format: 'json'
    })
        .then(apiRes => res.json(apiRes.data))
        .catch(err => console.log(err));
});

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

router.get('/ownedGames/:steamId', (req, res) => {
  axios
    .get(steamUrl("/IPlayerService/GetOwnedGames/v1"), { params: {
      steamid: req.params.steamId,
      include_appinfo: 1,
      include_played_free_games: 1
    }})
    .then(response => {
      let responseData = response.data.response
      for (let i = 0; i < responseData.game_count; i++){
        let gameImageUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${responseData.games[i].appid}/${responseData.games[i].img_logo_url}.jpg`
        response.data.response.games[i].image_url = gameImageUrl
      }
      return res.send(response.data.response.games)
    })
    .catch(error => console.log(error))
})

module.exports = router;