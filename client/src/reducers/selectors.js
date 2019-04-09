export const totalTimePlayed = games => {
  return parseInt((games || []).reduce((total, game) => (total + game.playtime_forever), 0) / 60)
}

export const topGames = games => {
  if (!games) return []
  return games.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 10)
}