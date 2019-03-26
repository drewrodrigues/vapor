if (process.env.NODE_ENV === "production") {
  module.exports = require('./urlsProd')
} else {
  module.exports = require('./urlsDev')
}