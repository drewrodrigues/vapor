// import { RECEIVE_SCREENSHOT } from '../actions/screenshotActions';
import { RECEIVE_GAME, CLEAR_GAME } from '../actions/gamesActions';

const _nullGame = {};

const gamesReducer = (state = _nullGame, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GAME:
      debugger;
      return Object.assign({}, state, action.game);
    case CLEAR_GAME:
      return _nullGame;
    // case RECEIVE_SCREENSHOT:
    //   return Object.assign({}, state, {[action.screenshot.game]: action.screenshot});
    default:
      return state;
  }
};

export default gamesReducer;