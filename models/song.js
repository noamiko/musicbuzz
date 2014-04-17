var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songSchemma = new Schema({
    title: String,
    artist: String,
    length: Number,
    songFileUrl: String
});

module.exports = mongoose.model('Song', songSchemma);