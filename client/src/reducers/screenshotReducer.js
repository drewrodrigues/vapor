import { RECEIVE_SCREENSHOT } from '../actions/screenshotActions';

const _nullScreenshot = {};

const screenshotReducer = (state = _nullScreenshot, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_SCREENSHOT:
      return action.screenshot;
    default:
      return state;
  }
};

export default screenshotReducer;