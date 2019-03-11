import axios from 'axios';


export const getPlayerAchievements = (steamId, appId) => {
    axios({
        method: 'POST',
        url: `/external/steam-user-data/player-achievements`,
        data: {steamId, appId}
    });
};

export const getOwnedGames = (steamId) => {
    axios({
        method: 'POST', 
        url: `/external/steam-user-data/owned-games`, 
        data: {steamId}
    });
};