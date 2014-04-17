var mongoose = require('mongoose')
        , song_vote = require('../models/song_vote.js');

module.exports = SongVoteList;

function SongVoteList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

SongVoteList.prototype = {
//    addSongVote: function(req, res) {
//        var host_id = req.body.hostid;
//        var songId = req.body.songid;
//        var like = req.body.like;
//        var disLike = req.body.dislike;
//        var lastVotedDate = req.body.lastvoteddate;
//        var nextAvailibleVoteDate = req.body.nextavailiblevotedate;
//
//        // Set up new SongVote data
//        newUser = new song_vote();
//        newUser.host_id = host_id;
//        newUser.songId = songId;
//        newUser.like = like;
//        newUser.disLike = disLike;
//        newUser.lastVotedDate = lastVotedDate;
//        newUser.nextAvailibleVoteDate = nextAvailibleVoteDate;
//
//        newUser.save(function savedUser(err) {
//            if (err) {
//                throw err;
//            }
//        });
//    },
    get_best_songs: function(req, res) {
        song_vote.find({host_id: req.body.host_id},
        function bestSongs(err, items)
        {
            if (items.length === 0)
            {
                res.send(false);
            } else
            {
                res.send(items.sort
                        (function compare(a, b)
                        {
                            if (a.like < b.like)
                            {
                                return -1;
                            }
                            if (a.like > b.like)
                                return 1;
                            return 0;

                        }
                        ));
            }
        });
    }
};