var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songSchemma = new Schema({
    _id: ObjectIdSong,
    title: String,
    artist: String,
    length: Number,
    songFileId: {type: Schema.Types.ObjectId, ref: 'song_file'}
});

module.exports = mongoose.model('Song', songSchemma);