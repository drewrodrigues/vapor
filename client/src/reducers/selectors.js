export const totalTimePlayed = games => {
  return parseInt((games || []).reduce((total, game) => (total + game.playtime_forever), 0) / 60)
}

export const topGames = games => {
  if (!games) return []
  return games.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 10)
}

export const totalAchievements = games => {
  return (games || []).reduce((total, game) => total + (game.completedAchievements|| 0), 0)
}

const totalPossibleAchievements = games => {
  return (games || []).reduce((total, game) => total + (game.totalAchievements|| 0), 0)
}

export const percentageAchievementsCompleted = games => {
  return parseInt(totalPossibleAchievements(games) / totalAchievements(games))
}