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
    data: req.body.screenshotData
  })
  .then(response => {
    return res.json(response.data);
  })
  .catch(err => {
    console.error(err);
  });
});


module.exports = router;
