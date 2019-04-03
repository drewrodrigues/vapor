export const totalTimePlayed = games => {
  return parseInt((games || []).reduce((total, game) => (total + game.playtime_forever), 0) / 60)
}