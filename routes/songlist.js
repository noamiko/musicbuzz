var mongoose = require('mongoose')
        , song = require('../models/song.js');

module.exports = SongList;

function SongList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

SongList.prototype = {
    addSong: function(req, res) {
        var title = req.body.title;
        var artist = req.body.artist;
        var length = req.body.length;
        var songFileId = req.body.songFileId;

        // Set up new SongVote data
        newUser = new song();
        newUser.title = title;
        newUser.artist = artist;
        newUser.length = length;
        newUser.songFileId = songFileId;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    getSong: function(req, res) {
        newUser.find({$or: [{title: req.body.title, artist: req.body.artist},
                {songId: req.body.songId}]}); //Uncheked 
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};