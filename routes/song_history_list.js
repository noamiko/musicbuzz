var mongoose = require('mongoose')
        , song = require('../models/song_history.js');

module.exports = song_history_list;

function song_history_list(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

song_history_list.prototype = {
    add_song_history: function(req, res) {

        // Set up new Song history data
        newSongHistory = new song_history();
        newSongHistory.user_id = req.body.userid;
        newSongHistory.song_id = req.body.songid;
        newSongHistory.like = 1; // Only added when first choosen
        newSongHistory.lastVotedDate = req.body.lastvoteddate;

        newSongHistory.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.send(true);
    },
    get_song_history: function(req, res) {
        newSongHistory.find({$or: [{title: req.body.title, artist: req.body.artist},
                {songId: req.body.songid}]}); //Uncheked 
        newSongHistory.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};