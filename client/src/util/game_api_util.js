import axios from 'axios';


// Steam
export const getSteamApp = (id) => (
    axios({
        url: `/external/steam/${id}`,
        method: 'GET'
    })
    .then(response => {
        console.log(response.data);
        return Object.values(response.data)[0].data;
    })
    .catch(err => {
        console.error(err);
    })
)

export const getSteamBG = (id) => (
    axios({
        url: `/external/steam/${id}/bg`,
        method: 'GET'
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    })
)

// IGDB
export const getIgdbApp = (name) => {
    let data = `fields *; where name = "${name}";`;
    debugger;
    return axios({
        url: `/external/igdb/games`,
        method: 'POST',
        data: {
            data
        }
    })
    .then(response => {
        debugger;
        console.log(response.data);
        return response.data[0];
    })
    .catch(err => {
        console.error(err.error);
    });
};

export const getScreenshots = gameId => {
    let data = `fields *; where game = ${gameId};`;

    return axios({
        url: "/external/igdb/screenshots",
        method: 'POST',
        data: {
            data
        }
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
};
