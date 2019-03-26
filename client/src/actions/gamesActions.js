import * as GameApiUtil from '../util/gameUtil';

export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_GAME_ERRORS = "RECEIVE_GAME_ERRORS";
export const CLEAR_GAME = "CLEAR_GAME";
export const CLEAR_GAMES = "CLEAR_GAMES";
export const CLEAR_SCREENSHOTS = "CLEAR_SCREENSHOTS";
export const RENDER_SCREENSHOTS = "RENDER_SCREENSHOTS";

export const clearGame = () => {
  return {
    type: CLEAR_GAME
  };
};

export const clearGames = () => {
  return {
    type: CLEAR_GAMES
  };
};

export const clearScreenshots = () => {
  return {
    type: CLEAR_SCREENSHOTS
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

export const renderScreenshots = () => {
  return {
    type: RENDER_SCREENSHOTS
  };
};

export const getSteamApp = ({ gameId }) => {
  return dispatch => {
    return GameApiUtil.getSteamApp(gameId).then(
      res => dispatch(receiveGame(res.data)),
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};

export const getIgdbApp = ({ name }) => {
  return dispatch => {
    return GameApiUtil.getIgdbApp(name).then(
      res => dispatch(receiveGame(res.data)),
      err => dispatch(receiveGameErrors(err.responseJSON))
    );
  };
};

export const getTTB = id => dispatch => {
  return GameApiUtil.getTTB(id).then(
    res => {
      return dispatch(receiveGame(res.data))
    },
    err => dispatch(receiveGameErrors(err.responseJSON))
  );
};
