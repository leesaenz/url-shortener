// Setting env as the current NODE_ENV
const env = process.env.NODE_ENV;
// Requiring config based on NODE_ENV value
if (env === 'development') {
  module.exports = require('./config/app.development.js');
}
if (env === 'production') {
  module.exports = require('./config/app.production.js');
}
