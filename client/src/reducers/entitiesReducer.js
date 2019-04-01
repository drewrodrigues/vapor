import { combineReducers } from 'redux';

import gamesReducer from './gamesReducer';
import profileReducer from './profileReducer';

const entitiesReducer = combineReducers({
  game: gamesReducer,
  profile: profileReducer
});

export default entitiesReducer;