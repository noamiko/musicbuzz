var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song schemma 
var songHistorySchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'host'},
    song_id: {type: Schema.Types.ObjectId, ref: 'song'},
    like: Number,
    lastVotedDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('SongsHistory', songHistorySchema);