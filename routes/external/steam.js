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
    console.log(req.body);
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
    var responseData;
    var steamId = req.params.steamId;
  axios
    .get(steamUrl("/IPlayerService/GetOwnedGames/v1"), { params: {
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
        let promiseArray = [];
        for (let i = 0; i < responseData.length; i++) {
            // axios call to get achievements
            // const p1 = axios({
            //     url: `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001`,
            //     method: `GET`,
            //     key: keys.steamAPIKey,
            //     appid: responseData[i].appId,
            //     steamid,
            //     format: 'json'
            // })            
            // .then(response => {
            //     let achievementsAll = response.data.playerstats.achievements;
            //     let achievementsCompleted = achievementsAll.filter(el => el.achieved === 1);
            //     responseData[i].totalAchievements = achievementsAll.length;
            //     responseData[i].completedAchievements = achievementsCompleted.length;
            // });
            // promiseArray.push(p1);

            const p2 = axios.get('https://api-v3.igdb.com/time_to_beats', {headers: {
                    'Accept': 'application/json',
                    'user-key': keys.igdbKey
                }, params: {
                    data: `fields *; where slug = ${responseData[i].name};`
                }
            })
            .then(response => {
                // const { data } = response;
                // let normally = 0;
                // let normally_count = 0;
                // data.forEach(el => {
                //     el.normally ? normally = normally + el.normally : '';
                //     el.normally ? normally_count++ : '';
                // });

                // normally = normally / normally_count;
                // responseData[i].avgTimePlayed = normally / 3600;
                responseData[i].avgTimePlayed = response.data;
            });
            promiseArray.push(p2);
        }
        return Promise.all(promiseArray)
            .then(() => {
                res.send(responseData);
                console.log("Trying to respond...");
            });
    })
    .catch(error => {
        res.send(error);
    });
})

module.exports = router;