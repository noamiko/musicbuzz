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
        var songFileId = req.body.songfileid;

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
    get_song: function(req, res)
    {
        song.findOne({songFileId: req.body.song_id},
        function songFound(err, item)
        {
            if (item === {})
            {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    },
    search_song: function(req, res) {
        song.findOne({$or: [{title: req.body.key, artist: req.body.key}]},
        function songFound(err, item)
        {
            if (item === {})
            {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    }
};