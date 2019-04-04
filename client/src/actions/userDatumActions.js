import * as steamApiUtil from '../util/userDatumUtil';

// export const RECEIVE_PLAYER_GAME_ACHIEVEMENTS = "RECEIVE_PLAYER_GAME_ACHIEVEMENTS";
export const RECEIVE_OWNED_GAMES = "RECEIVE_OWNED_GAMES";

export const RECEIVE_PROFILE = "RECEIVE_PROFILE"
export const REMOVE_PROFILE = "REMOVE_PROFILE"

// const recieveOwnedGames = (ownedGames, gamesAndTimes) => ({
  //     type: RECEIVE_OWNED_GAMES,
  //     // format = array appIds
  //     ownedGames,
  //     // format = array of objects {appId, playtime_forever(in min)}
  //     gamesAndTimes,
  // });

              // const recievePlayerGameAchievements = (achievements, gameName) => ({
              //     type: RECEIVE_PLAYER_GAME_ACHIEVEMENTS,
              //     // format = array of objects
              //     achievements,
              //     // format = string
              //     gameName,
              // });

const receiveProfile = profile => {
  return {
    type: RECEIVE_PROFILE,
    profile
  }
}

const removeProfile = () => {
  return {
    type: REMOVE_PROFILE
  }
}

const receiveOwnedGames = ownedGames => {
  return {
    type: RECEIVE_OWNED_GAMES,
    ownedGames
  }
}

// export const getPlayerGameAchievements = (steamId, appId) => dispatch => (
//     steamApiUtil.getPlayerGameAchievements(steamId, appId)
//         .then(res => dispatch(recievePlayerGameAchievements(res.data.playerstats.achievements,
//             res.data.playerstats.gameName)))
// );

export const getProfile = steamId => dispatch => {
  return steamApiUtil.getProfile(steamId)
    .then(res => {
      return dispatch(receiveProfile(res.data))
    })
    .catch(error => {
      console.log(error)
    })
}

export const clearProfile = () => dispatch => {
  return dispatch(removeProfile())
}

export const getOwnedGames = steamId => dispatch => {
  return steamApiUtil.getOwnedGames(steamId)
    .then(res => {
      dispatch(receiveOwnedGames(
        res.data.filter(game => game.playtime_forever > 599)
      ))
    })
    .catch(error => {
      console.log(error)
    })
}