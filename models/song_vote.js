var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songVoteSchemma = new Schema({
    host_id: ObjectIdUser,
    songId: ObjectIdSong,
    like: Number,
    disLike: Number,
    lastVotedDate: {type: Date, default: Date.now},
    nextAvailibleVoteDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SongVotes', songVoteSchemma);