import { CLEAR_SCREENSHOTS, RENDER_SCREENSHOTS } from '../actions/gamesActions';

const preloaded = {
  fetched: false,
  url: null,
};

const loadingReducer = (state = preloaded, action) => {
  Object.freeze(state);

  switch (action.type) {
    case CLEAR_SCREENSHOTS:
      return {fetched: false, url: state.url};
    case RENDER_SCREENSHOTS:
      return {
        fetched: true,
        url: action.url,
      };
    default:
      return state;
  }
};

export default loadingReducer;