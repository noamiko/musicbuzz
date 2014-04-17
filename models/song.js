var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songSchemma = new Schema({
    title: String,
    artist: String,
    length: Number,
    url: String
});

module.exports = mongoose.model('Song', songSchemma);