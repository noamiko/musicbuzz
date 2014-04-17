var mongoose = require('mongoose')
        , song_vote = require('../models/song_vote.js');

module.exports = SongVoteList;

function SongVoteList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

SongVoteList.prototype = {
    addSongVote: function(req, res) {
        var host_id = req.body.host_id;
        var songId = req.body.songId;
        var like = req.body.like;
        var disLike = req.body.disLike;
        var lastVotedDate = req.body.lastVotedDate;
        var nextAvailibleVoteDate = req.body.nextAvailibleVoteDate;

        // Set up new SongVote data
        newUser = new song_vote();
        newUser.host_id = host_id;
        newUser.songId = songId;
        newUser.like = like;
        newUser.disLike = disLike;
        newUser.lastVotedDate = lastVotedDate;
        newUser.nextAvailibleVoteDate = nextAvailibleVoteDate;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    getSongVote: function(req, res) {
        user.find({host_id: req.body.host_id, songId: req.body.songId});
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    setSongVote: function(req, res) {
        // TODO
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};