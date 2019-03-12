import * as GameApiUtil from '../util/game_api_util';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_GAME_ERRORS = "RECEIVE_GAME_ERRORS";
export const CLEAR_GAME = "CLEAR_GAME";

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};

const receiveGame = game => {
  debugger;
  return {
    type: RECEIVE_GAME,
    game
  };
};

const receiveGameErrors = err => {
  return {
    type: RECEIVE_GAME_ERRORS,
    err
  };
};

export const getSteamInfo = ({ gameId }) => {
  return dispatch => {
    return GameApiUtil.getSteamApp(gameId).then(
      steamData => {
        debugger;
        return dispatch(receiveGame(steamData))},
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};

export const getIgdbInfo = ({ name }) => {
  debugger;
  return dispatch => {
    return GameApiUtil.getIgdbApp(name).then(
      igdbData => {
          debugger;
          return dispatch(receiveGame(igdbData))
        },
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};