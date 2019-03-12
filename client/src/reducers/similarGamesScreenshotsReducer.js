import { RECEIVE_SCREENSHOTS, CLEAR_SCREENSHOTS } from '../actions/gamesActions';

const _nullScreenshots = {};

const similarGamesScreenshotsReducer = (state = _nullScreenshots, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SCREENSHOTS:
      let screenshots = {};
      action.screenshots.forEach(screenshot => {
        screenshots[screenshot.igdb_id] = screenshot;
      });
      return Object.assign({}, state, screenshots);
    case CLEAR_SCREENSHOTS:
      return _nullScreenshots;
    default:
      return state;
  }
};

export default similarGamesScreenshotsReducer;