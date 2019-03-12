import { RECEIVE_SCREENSHOTS, CLEAR_SCREENSHOTS } from '../actions/gamesActions';

const _nullBackground = false;

const loadingReducer = (state = _nullBackground, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CLEAR_SCREENSHOTS:
      return _nullBackground;
    case RECEIVE_SCREENSHOTS:
      return true;
    default:
      return state;
  }
};

export default loadingReducer;