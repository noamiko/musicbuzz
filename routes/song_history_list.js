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
    getUserSongHistory: function(user_id)
    {
        newSongHistory.find({user_id: user_id},
        function songHistory(err, items)
        {
            return items.sort(function compare(a, b)
            {
                if (a.lastVotedDate > b.lastVotedDate)
                {
                    return -1;
                }
                if (a.lastVotedDate < b.lastVotedDate)
                    return 1;
                return 0;
            })
        })
    },
    get_user_song_history: function(req, res) {
        var history = this.getUserSongHistory(res.body.user_id);
        if (history.length !== 0)
        {
            res.send(history.slice(0, 5));
        } else
        {
            res.send();
        }
    }
};