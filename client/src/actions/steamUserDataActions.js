import * as steamApiUtil from '../util/steam_api_util';

export const RECEIVE_PLAYER_GAME_ACHIEVEMENTS = "RECEIVE_PLAYER_GAME_ACHIEVEMENTS";
export const RECEIVE_OWNED_GAMES = "RECEIVE_OWNED_GAMES";

const recievePlayerGameAchievements = (achievements, gameName) => ({
    type: RECEIVE_PLAYER_GAME_ACHIEVEMENTS,
    // format = array of objects
    achievements,
    // format = string
    gameName,
});

const recieveOwnedGames = (ownedGames, gamesAndTimes) => ({
    type: RECEIVE_OWNED_GAMES,
    // format = array appIds
    ownedGames,
    // format = array of objects {appId, playtime_forever(in min)}
    gamesAndTimes,
});

export const getPlayerGameAchievements = (steamId, appId) => dispatch => (
    steamApiUtil.getPlayerGameAchievements(steamId, appId)
        .then(res => dispatch(recievePlayerGameAchievements(res.data.playerstats.achievements,
            res.data.playerstats.gameName)))
);

export const getOwnedGames = (steamId) => dispatch => (
    steamApiUtil.getOwnedGames(steamId)
        .then(res => dispatch(recieveOwnedGames(
            res.data.response.games
                .filter(game => game.playtime_forever > 599)
                .map(game => game.appid),
            res.data.response.games
                .filter(game => game.playtime_forever > 599)
                )
            )
        )
);

