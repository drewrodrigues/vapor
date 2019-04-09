const axios = require('axios')
const keys = require('../../config/keys')

module.exports = {
  getIgdbIds: (gameArray, promiseArray) => {
    for (let i = 0; i < gameArray.length; i++) {
      const sani_name = gameArray[i].name.replace(/[^0-9a-z'\s]/gi, ' ')
        .replace(/[^0-9a-z\s]/gi, '')
        .replace(/\s\s+/g, ' ')
        .toLowerCase().split(" ").join("-");
      const x = axios.get('https://api-v3.igdb.com/games', {
        headers: {
          'Accept': 'application/json',
          'user-key': keys.igdbKey
        },
        data: `fields id; where slug = "${sani_name}";`
      })
        .then(response => {
          const game = response.data[0];
          if (game) {
            gameArray[i].igdbId = game.id;
          } else {
            gameArray[i].igbdId = null;
          }
        })
      promiseArray.push(x);
    }
  },

  getAchievementsAndAverageTimes: (gameArray, steamId, promiseArray) => {
    for (let i = 0; i < gameArray.length; i++) {
      // axios call to get achievements
      const p1 = axios.get(`http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001`, {
        params: {
          key: keys.steamAPIKey,
          appid: gameArray[i].appid,
          steamId
        }
      })
        .then(response => {
          let achievementsAll = response.data.playerstats.achievements;
          let achievementsCompleted = achievementsAll.filter(el => el.achieved === 1);
          gameArray[i].totalAchievements = achievementsAll.length;
          gameArray[i].completedAchievements = achievementsCompleted.length;
        })
        .catch(err => {
          gameArray[i].totalAchievements = null;
          gameArray[i].completedAchievements = null;
        });
      promiseArray.push(p1);

      if (gameArray[i].igdbId) {
        const p2 = axios.get('https://api-v3.igdb.com/time_to_beats', {
          headers: {
            'Accept': 'application/json',
            'user-key': keys.igdbKey
          },
          data: `fields *; where game = ${gameArray[i].igdbId}; limit 50;`
        })
          .then(response => {
            const { data } = response;
            let normally = 0;
            let normally_count = 0;
            for (let j = 0; j < data.length; j++) {
              data[j].normally ? normally += data[j].normally : '';
              data[j].normally ? normally_count++ : '';
            }

            if (normally > 0 && normally_count > 0) {
              gameArray[i].avgTimePlayed = Math.floor(normally / normally_count / 60);
            } else {
              gameArray[i].avgTimePlayed = gameArray[i].playtime_forever;
            }
          });
        promiseArray.push(p2);
      } else {
        gameArray[i].avgTimePlayed = gameArray[i].playtime_forever;
      }
    }
  }
}