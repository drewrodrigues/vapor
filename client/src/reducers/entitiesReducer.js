import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';

const entitiesReducer = combineReducers({
  game: gamesReducer
});

export default entitiesReducer;