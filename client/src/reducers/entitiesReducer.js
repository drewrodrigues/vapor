import { combineReducers } from 'redux';

import gamesReducer from './gamesReducer';
import profileReducer from './profileReducer';
import statsReducer from './statsReducer'

const entitiesReducer = combineReducers({
  game: gamesReducer,
  profile: profileReducer,
  stats: statsReducer
});

export default entitiesReducer;