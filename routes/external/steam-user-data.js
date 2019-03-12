const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const axios = require('axios');

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

module.exports = router;