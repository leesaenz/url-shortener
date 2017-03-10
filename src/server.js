//Setting env as the current NODE_ENV
var env = process.env.NODE_ENV;
//Requiring config based on NODE_ENV value
module.exports = require('./config/app.'+env+'.js');