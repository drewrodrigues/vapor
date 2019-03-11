const express  = require('express')
const router   = express.Router()
const axios    = require('axios')

// redirect to steam to authenticate
router.get("/:id", (req,res) => {
    axios({
        url: `https://store.steampowered.com/api/appdetails?appids=${req.params.id}`,
        method: 'GET'
      })
        .then(response => {
            res.json(response.data)
        })
        .catch(err => {
            console.error(err);
        });
})


module.exports = router;


