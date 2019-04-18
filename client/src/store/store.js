import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from '../reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (preloadedState = {}) => {
  if (process.env.NODE_ENV === "production") {
    return createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(thunk))
    );
  } 
  else {
    return createStore(
      rootReducer,
      preloadedState,
      composeEnhancers(applyMiddleware(thunk, logger))
    );
  }
};

export default configureStore;