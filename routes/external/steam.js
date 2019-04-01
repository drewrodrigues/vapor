const express  = require('express')
const router   = express.Router()
const axios    = require('axios')
const keys = require('../../config/keys');

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

// get player's owned games
router.post('/owned-games', (req, res) => {
    axios({
        url: `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steamAPIKey}&steamid=${req.body.steamId}&format=json`,
        method: `GET`,
        // key: keys.steamAPIKey,
        include_free_played_games: true,
        steamid: req.body.steamId,
        format: 'json'
    })
        .then(apiRes => res.json(apiRes.data))
        .catch(err => console.log(err));
});

router.get('/profile/:steamId', (req, res) => {
  axios
    .get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${keys.steamAPIKey}&steamids=${req.params.steamId}`)
    .then(response => {
      return res.send(response.data.response.players[0])
    })
    .catch(error => console.log(error))
})

module.exports = router;