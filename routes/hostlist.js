var mongoose = require('mongoose')
        , host = require('../models/host.js')
        , user = require('../models/user.js')
        , song_vote = require('../models/song_vote.js');
module.exports = HostList;
function HostList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...
    });
}

HostList.prototype = {
    signup_host: function(req, res) {

        var bizName = req.body.bizname;
        var email = req.body.email;
        var flag = true;
        //Verify bizName and email are unique
        host.findOne({bizName: bizName}, function foundHost(err, item) {
            if (item === {}) {
                flag = false;
            }
        });
        if (flag) {
            host.findOne({email: email}, function foundHost(err, item) {
                if (item === {}) {
                    flag = false;
                }
            });
        }
        if (flag) {

// Set up new Host data
            newHost = new host();
            newHost.bizName = bizName;
            newHost.userName = req.body.username;
            newHost.email = email;
            newHost.password = req.body.pwd;
            newHost.address = req.body.address;
            newHost.country = req.body.country;
            newHost.url = req.body.url;
            newHost.currentSongId = req.body.currentsongid;
            newHost.nextSongId = req.body.nextsongid;
//            newHost.geoLocation = {lng: req.body.lng, lat: req.body.lat};

            newHost.save(function savedHost(err) {
                if (err) {
                    throw err;
                }
            });
            res.send(newHost);
        } else {
            res.send(false);
        }
    },
    get_host: function(req, res) {
        host.findOne({bizName: req.body.bizname}, function foundHost(err, item) {
            res.send(item);
        });
        newHost.save(function savedHost(err) {
            if (err) {
                throw err;
            }
        });
    },
    login_host: function(req, res)
    {
        var email = req.body.email;
        var password = req.body.pwd;
        //Verify email and password are valid
        host.findOne({email: email, password: password}, function foundHost(err, item) {
            if (item === {}) {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    },
    getHostUsers: function(host_id)
    {
        user.find({hostId: host_id},
        function foundHosts(err, items)
        {
            return items;
        });
    },
    getSongVotes: function(host_id)
    {
        song_vote.find({hostId: host_id},
        function foundVotes(err, items)
        {
            return items;
        });
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
    getTopThreeSongs: function(songHistory)
    {
        songHistory.sort(function compare(a, b)
        {
            if (a.like > b.like)
            {
                return 1;
            }
            if (a.like < b.like)
                return -1;
            return 0;
        }).slice(0, 3);
    },
    choose_next_song: function(req, res)
    {
        var host_id = res.body.host_id;
        var totolScore = 0;
        var songVotes = getSongVotes(host_id);
        var users = getHostUsers(host_id);

        for (var song in songVotes)
        {
            song.totalScore = 0.6 * song.like;
        }

        // Give each three passive votes with diffrent weights
        for (var user in users)
        {
            var songHistory = this.getUserSongHistory(user._id);
            var topThreeSongs = this.getTopThreeSongs(songHistory);
            songVotes[topThreeSongs[0]] += 0.4;
            songVotes[topThreeSongs[1]] += 0.2;
            songVotes[topThreeSongs[2]] += 0.1;
        }

        var bestSong = songVotes.sort(function compare(a, b)
        {
            if (a.like > b.like)
            {
                return 1;
            }
            if (a.like < b.like)
                return -1;
            return 0;
        })[0];
        bestSong.like = 0;
        return bestSong;
    }
};