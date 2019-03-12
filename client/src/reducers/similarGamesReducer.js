import { RECEIVE_GAMES, CLEAR_GAMES } from '../actions/gamesActions';

const _nullGames = {};

const similarGamesReducer = (state = _nullGames, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GAMES:
      let games = {};
      action.games.forEach( game => {
        games[game.igdb_id] = game;
      });
      return Object.assign({}, state, games);
    case CLEAR_GAMES:
      return _nullGames;
    default:
      return state;
  }
};

export default similarGamesReducer;