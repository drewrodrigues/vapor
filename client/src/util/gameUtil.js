import axios from 'axios';


// Steam
export const getSteamApp = (id) => (
    axios({
        url: `/external/steam/${id}`,
        method: 'GET'
    })
)

export const getSteamBG = (id) => (
    axios({
        url: `/external/steam/${id}/bg`,
        method: 'GET'
    })
)

// IGDB
export const getIgdbApp = (name) => {
    let data = `fields id, popularity, pulse_count, aggregated_rating, aggregated_rating_count, similar_games; where name = "${name}";`;
    return axios({
        url: `/external/igdb/games`,
        method: 'POST',
        data: {
            data
        }
    })
}

export const getTTB = (id) => {
    let data = `fields *; where id = ${id};`;

    return axios({
        url: `/external/igdb/ttb`,
        method: 'POST',
        data: {
            data
        }
    })
}

export const getScreenshots = gameId => {
    let data = `fields *; where game = ${gameId};`;

    return axios({
        url: "/external/igdb/screenshots",
        method: 'POST',
        data: {
            data
        }
    })
};
