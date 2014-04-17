var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songVoteSchemma = new Schema({
    host_id: {type: Schema.Types.ObjectId, ref: 'host'},
    songId: {type: Schema.Types.ObjectId, ref: 'song'},
    like: Number,
    disLike: Number,
    totalScore: Number,
    lastVotedDate: {type: Date, default: Date.now},
    nextAvailibleVoteDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SongVotes', songVoteSchemma);