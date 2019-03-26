const express = require('express')
const app     = express()
const path    = require('path')

// mounting frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'))
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

// middleware -----------------------------------------------------------------
const morgan = require('morgan')
app.use(morgan('dev'))

var cors = require('cors');
app.use(cors());

// database -------------------------------------------------------------------
// - setup
const db       = require('./config/keys').mongoURI;
const mongoose = require('mongoose');

// - connect
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to mongodb'))
  .catch(err => console.log(err));

// routes ---------------------------------------------------------------------
// - setup
const bodyParser = require('body-parser')
const passport   = require('passport')
const auth       = require('./routes/api/auth')
const igdb       = require('./routes/external/igdb')
const steam      = require('./routes/external/steam')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)
app.use(bodyParser.json())

// - routes
app.use('/api/auth', auth)
app.use('/external/igdb', igdb)
app.use('/external/steam', steam)

// server ---------------------------------------------------------------------
// - setup
const port = process.env.PORT || 5000;

// - listen
app.listen(port, () => console.log(`Server is running on port ${port}`));