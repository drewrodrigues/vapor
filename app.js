const express = require('express')
const app     = express()

// database -------------------------------------------------------------------
// - setup
const db       = require('./config/keys').mongoURI
const mongoose = require('mongoose')

// - connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.log(err))

// routes ---------------------------------------------------------------------
// - setup
const bodyParser = require('body-parser')
const users      = require('./routes/api/users')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// - routes
app.use('/api/users', users)

// server ---------------------------------------------------------------------
// - setup
const port = process.env.PORT || 5000

// - listen
app.listen(port, () => console.log(`Server is running on port ${port}`))