//Storing package requirements
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost:27017/urls');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongo connection error in production'));

db.once('open', function() {
  console.log('Mongo connected in production...');
});

const url = require('../models/url.js');
//Configuring the Server

//Setting the port at 3000
const port = process.env.PORT || 3000;

//Telling express to use the body parser for JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Setting the base API route to api/v1
app.use('/', require('../routes')(express));

var server = app.listen(port, function() {
  console.log('Server is running in production on port', port);
});

module.exports = server;