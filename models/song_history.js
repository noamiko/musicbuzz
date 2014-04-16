var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songHistorySchema = new Schema({
    user_id: ObjectIdHost,
    song_id: ObjectIdSong,
    like: Number,
    lastVotedDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SongsHistory', songHistorySchema);