import { 
  CLEAR_SCREENSHOTS, 
  RENDER_SCREENSHOTS,
} from '../actions/gamesActions';

import {
  SET_LANDING_LOADING,
  CLEAR_LANDING_LOADING
} from '../actions/loadingActions';

const preloaded = {
  fetched: false,
  backgroundUrl: null,
  landing: true
};

const loadingReducer = (state = preloaded, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {

    case CLEAR_SCREENSHOTS:
      newState = {
        fetched: false, 
        backgroundUrl: state.url
      };
      return Object.assign({}, state, newState);

    case RENDER_SCREENSHOTS:
      newState =  {
        fetched: true,
        backgroundUrl: action.url,
      };
      return Object.assign({}, state, newState);

    case SET_LANDING_LOADING:
      return Object.assign({}, state, {landing: true})

    case CLEAR_LANDING_LOADING:
      return Object.assign({}, state, {landing: false})


    default:
      return state;
  }


};

export default loadingReducer;