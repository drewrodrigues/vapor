import axios from 'axios';

export const getProfile = steamId => {
  return axios
    .get(`/external/steam/profile/${steamId}`)
}

export const getOwnedGames = steamId => {
  return axios
    .get(`/external/steam/ownedGames/${steamId}`)
}