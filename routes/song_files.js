var mongoose = require('mongoose')
        , song_file = require('../models/song_files.js');

module.exports = SongFiles;

function SongFiles(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

SongFiles.prototype = {
    addSong: function(req, res) {
        song_file.findOne({},
                function songFile(err, item)
                {
                    if (item === null)
                    {
                        res.send(false);
                    } else
                    {

                        // Set up new SongVote data
                        newSongFile = new song_file();
                        newSongFile.songFile = req.body.songfile
                        newSongFile.save(function savedUser(err) {
                            if (err) {
                                throw err;
                            }
                        });
                        res.send(newSongFile);
                    }
                });
    },
    getSong: function(req, res) {
        newSongFile.find({$or: [{title: req.body.title, artist: req.body.artist},
                {songId: req.body.songId}]}); //Uncheked 
        newSongFile.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
    }
};