import { combineReducers } from 'redux';
import gamesReducer from './gamesReducer';
import similarGamesReducer from './similarGamesReducer'
import similarGamesScreenshotsReducer from './similarGamesScreenshotsReducer';
import profileReducer from './profileReducer';

const entitiesReducer = combineReducers({
  game: gamesReducer,
  profile: profileReducer,
  similarGames: similarGamesReducer,
  similarGamesScreenshots: similarGamesScreenshotsReducer
});

export default entitiesReducer;