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
        newUser = new song_history();
        newUser.user_id = req.body.user_id;
        newUser.song_id = req.body.song_id;
        newUser.like = 1; // Only added when first choosen
        newUser.lastVotedDate = req.body.lastVotedDate;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.send(true);
    },
    get_song_history: function(req, res) {
        newUser.find({$or: [{title: req.body.title, artist: req.body.artist},
                {songId: req.body.songId}]}); //Uncheked 
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};