var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songSchemma = new Schema({
    title: String,
    artist: String,
    length: Number,
    totalScore: Number,
    songFileId: {type: Schema.Types.ObjectId, ref: 'song_file'}
});

module.exports = mongoose.model('Song', songSchemma);