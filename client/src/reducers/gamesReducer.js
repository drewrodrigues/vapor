// import { RECEIVE_SCREENSHOT } from '../actions/screenshotActions';
import { RECEIVE_GAME, CLEAR_GAME } from '../actions/gamesActions';

const _nullGame = {};

const gamesReducer = (state = _nullGame, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GAME:
      return Object.assign({}, state, action.game);
    case CLEAR_GAME:
      return _nullGame;
    default:
      return state;
  }
};

export default gamesReducer;