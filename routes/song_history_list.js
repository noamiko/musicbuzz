var mongoose = require('mongoose')
        , song = require('../models/song_history.js');

module.exports = song_history_list;

function song_history_list(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

song_history_list.prototype = {
    addSongHistory: function(req, res) {
        var user_id = req.body.user_id;
        var song_id = req.body.song_id;
        var like = req.body.like;
        var lastVotedDate = req.body.lastVotedDate;

        // Set up new Song history data
        newUser = new song_history();
        newUser.user_id = user_id;
        newUser.song_id = song_id;
        newUser.like = like;
        newUser.lastVotedDate = lastVotedDate;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    getSongHistory: function(req, res) {
        newUser.find({$or: [{title: req.body.title, artist: req.body.artist},
                {songId: req.body.songId}]}); //Uncheked 
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};