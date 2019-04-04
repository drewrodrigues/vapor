import axios from 'axios';

// export const getPlayerGameAchievements = (steamId, appId) => (
//     axios({
//         method: 'POST',
//         url: `/external/steam/player-achievements`,
//         data: {steamId, appId}
//     })
// );

export const getProfile = steamId => {
  return axios
    .get(`/external/steam/profile/${steamId}`)
}

export const getOwnedGames = steamId => {
  return axios
    .get(`/external/steam/ownedGames/${steamId}`)
}