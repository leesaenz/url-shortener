// Storing package requirements
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('lee-fs-utility-debugger');

// Setting env as the current NODE_ENV
const env = process.env.NODE_ENV;

const app = express();

mongoose.connect('mongodb://localhost:27017/urls');
const db = mongoose.connection;

// I'm not sure how to get this statement working with the custom logger.
// db.on('error', logger.log('Mongo connection error in development'));

db.once('open', () => {
  if (env === 'development') {
    logger.info('Mongo connected %s', 'in production...');
  }
});

// Configuring the Server

// Setting the port at 3000
const port = process.env.PORT || 3000;

// Telling express to use the body parser for JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// Setting the base API route to api/v1
app.use('/', require('../routes')(express));

const server = app.listen(port, () => {
  if (env === 'development') {
    logger.info('Server is running in production on port', port);
  }
});

module.exports = server;
