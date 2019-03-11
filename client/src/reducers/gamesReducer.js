import { RECEIVE_SCREENSHOT } from '../actions/screenshotActions';

const _nullScreenshot = {};

const gamesReducer = (state = _nullScreenshot, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SCREENSHOT:
      return Object.assign({}, state, {[action.screenshot.game]: action.screenshot});
    default:
      return state;
  }
};

export default gamesReducer;