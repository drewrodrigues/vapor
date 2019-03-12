import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import similarGamesReducer from './similarGamesReducer'
import similarGamesScreenshotsReducer from './similarGamesScreenshotsReducer';

const entitiesReducer = combineReducers({
  game: gamesReducer,
  similarGames: similarGamesReducer,
  similarGamesScreenshots: similarGamesScreenshotsReducer
});

export default entitiesReducer;