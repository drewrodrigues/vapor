const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const axios = require('axios');

router.post('/screenshots', (req, res) => {
  return axios({
    url: "https://api-v3.igdb.com/screenshots",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
  .then(response => {
    return res.json(response.data);
  })
  .catch(err => {
    console.error(err);
  });
});

router.post('/games', (req, res) => {
  return axios({
    url: `https://api-v3.igdb.com/games`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
    .then(response => {
      const game = response.data[0];
      const data = {
        igdb_id: game.id,
        popularity: game.popularity,
        pulse_count: game.pulse_count,
        total_rating_count: game.total_rating_count,
        total_rating: game.total_rating,
        similar_games: game.similar_games,
      };
      return res.json(data);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/ttb', (req, res) => {
  return axios({
    url: `https://api-v3.igdb.com/time_to_beats`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
  .then(response => {
    const game = response.data[0]
    delete game.id
    return res.json(game);
  })
  .catch(err => {
    console.error(err);
  });
});
  
  https://api-v3.igdb.com/time_to_beats

module.exports = router;
