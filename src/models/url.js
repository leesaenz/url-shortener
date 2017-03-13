// Creates Movie Model Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  longurl: String,
  shorturl: String,
});

module.exports = mongoose.model('Url', urlSchema);
