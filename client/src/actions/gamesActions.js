import * as GameApiUtil from '../util/gameUtil';

export const RECEIVE_GAMES = "RECEIVE_GAMES";
export const RECEIVE_GAME = "RECEIVE_GAME";
export const RECEIVE_SCREENSHOTS = "RECEIVE_SCREENSHOTS";
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

const receiveGames = games => {
  return {
    type: RECEIVE_GAMES,
    games
  };
};

const receiveGame = game => {
  return {
    type: RECEIVE_GAME,
    game
  };
};

const receiveScreenshots = screenshots => {
  return {
    type: RECEIVE_SCREENSHOTS,
    screenshots
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

export const getIgdbApps = ({ gameIds }) => {
  return dispatch => {
    return GameApiUtil.getIgdbApps(gameIds).then(
      res => dispatch(receiveGames(res.data)),
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

export const getScreenshots = ({ gameIds }) => {
  return dispatch => {
    return GameApiUtil.getScreenshots(gameIds).then(
      res => dispatch(receiveScreenshots(res)),
      err => dispatch(receiveGameErrors(err))
    );
  };
};
