var mongoose = require('mongoose')
        , song = require('../models/song.js');

module.exports = SongList;

function SongList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

SongList.prototype = {
    add_song: function(req, res) {

        // Set up new Song data
        newUser = new song();
        newUser.title = req.body.title;
        newUser.artist = req.body.artist;
        newUser.length = req.body.length;
        newUser.url = req.body.url;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    },
    search_song: function(req, res) {
//        song.find({$or: [{title: req.body.key, artist: req.body.key
        song.find({artist: req.body.key},
        function songFound(err, items)
        {
            if (items.length === 0)
            {
                res.send(false);
            } else
            {
                res.send(items);
            }
        });
    },
    get_song: function(req, res)
    {
        song.findOne({_id: req.body.song_id}, function foundSong(err, item)
        {
            res.send(item	);
        })
    }
};