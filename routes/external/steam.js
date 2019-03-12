const express  = require('express')
const router   = express.Router()
const axios    = require('axios')

// redirect to steam to authenticate
router.get("/:id", (req, res) => {
    axios({
        url: `https://store.steampowered.com/api/appdetails?appids=${req.params.id}`,
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
                steam_id: game.steam_appid
            }
            res.json(data)
        })
        .catch(err => {
            console.error(err);
        });
})


module.exports = router;