import axios from 'axios';


// Steam
export const getSteamApp = (id) => (
    axios({
        url: `/external/steam/${id}`,
        method: 'GET'
    })
    .then(response => {
        console.log(response.data);
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
export const getIgdbApp = (id) => (
    axios({
        url: `/external/igdb/${id}`,
        method: 'GET'
    })
    .then(response => {
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    })
)

export const getScreenshots = gameId => {
    let screenshotData = `fields *; where game = ${gameId};`;

    return axios({
        url: "/external/igdb/screenshots",
        method: 'POST',
        data: {
            screenshotData
        }
    })
    .then(response => {
        console.log(response.data);
        return response.data;
    });
};
