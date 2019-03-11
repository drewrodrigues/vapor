const express = require('express')
const app     = express()

// middleware -----------------------------------------------------------------
const morgan = require('morgan')
app.use(morgan('dev'))

var cors = require('cors');
app.use(cors());

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
const passport   = require('passport')
const auth       = require('./routes/api/auth')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use(bodyParser.json())

// - routes
app.use('/api/auth', auth)

// server ---------------------------------------------------------------------
// - setup
const port = process.env.PORT || 5000

// - listen
app.listen(port, () => console.log(`Server is running on port ${port}`))