import * as GameApiUtil from '../util/gameUtil';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_GAME_ERRORS = "RECEIVE_GAME_ERRORS";
export const CLEAR_GAME = "CLEAR_GAME";

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};

const receiveGame = game => {
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
      res => {
        return dispatch(receiveGame(res.data))},
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};

export const getIgdbInfo = ({ name }) => {
  return dispatch => {
    return GameApiUtil.getIgdbApp(name).then(
      res => {
          return dispatch(receiveGame(res.data))
        },
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};

export const getTTB = id => dispatch => {
    return GameApiUtil.getTTB(id)
    .then(res => dispatch(receiveGame(res.data)))
}
