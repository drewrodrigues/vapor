const keys = require('../config/keys')
const axios    = require('axios')

const generateGamesIconUrl = games => {
  games.forEach(game => {
    let gameImageUrl = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
    game.image_url = gameImageUrl
  })
  return games
}

exports.steamUrl = route => {
  return `https://api.steampowered.com${route}/?key=${keys.steamAPIKey}`
}

exports.getOwnedGames = steamId => {
  return axios
    .get(this.steamUrl("/IPlayerService/GetOwnedGames/v1"), { params: {
      steamid: steamId,
      include_appinfo: 1,
      include_played_free_games: 1
    }})
    .then(response => {
      let games = response.data.response.games
      generateGamesIconUrl(games)
      return games
    })
}

exports.getGameGenres = games => {
  
}