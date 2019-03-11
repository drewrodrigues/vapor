import {getSchemaForGame} from '../util/steam_api_util';

export const RECEIVE_ALL_GAME_ACHIEVEMENTS = "RECEIVE_ALL_GAME_ACHIEVEMENTS";

const recieveAllGameAchievements = achievements => ({
    type: RECEIVE_ALL_GAME_ACHIEVEMENTS,
    achievements
});

export const getGameAchievements = (gameId) => dispatch => (
    getSchemaForGame(gameId)
        .then(res => dispatch(recieveAllGameAchievements(gameId)))
);