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
    console.log(req.body.data);
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
        console.log(req.body.data)
      return res.json(response.data);
    })
    .catch(err => {
      console.error(err);
    });
  });
  


module.exports = router;
