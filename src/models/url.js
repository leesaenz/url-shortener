//Creates Movie Model Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var urlSchema = new Schema({
  longurl : String,
  shorturl    : String
});

module.exports = mongoose.model('Url', urlSchema);