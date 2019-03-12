import axios from 'axios';

export const getPlayerGameAchievements = (steamId, appId) => (
    axios({
        method: 'POST',
        url: `/external/steam/player-achievements`,
        data: {steamId, appId}
    })
);

export const getOwnedGames = (steamId) => (
    axios({
        method: 'POST', 
        url: `/external/steam/owned-games`, 
        data: {steamId}
    })
);