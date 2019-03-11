import axios from 'axios';


export const scrapeGames = () => {
    axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': "9de803e52adfe498a4d21456a080090c",
            'Access-Control-Allow-Origin': '*',
        },
        data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,collection,cover,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres,hypes,involved_companies,keywords,multiplayer_modes,name,parent_game,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;"
      })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.error(err);
        });
}

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
        return response.data;
    });
};