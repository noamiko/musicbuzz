var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songSchemma = new Schema({
    _id: ObjectIdSong,
    title: String,
    artist: String,
    length: Number,
    songFileId: ObjectIdSongFile
});

module.exports = mongoose.model('Song', songSchemma);