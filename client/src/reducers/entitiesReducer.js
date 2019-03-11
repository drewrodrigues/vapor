import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer'

const entitiesReducer = combineReducers({
  games: gamesReducer
});

export default entitiesReducer;