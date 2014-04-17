var mongoose = require('mongoose')
        , user = require('../models/user.js')
        , host = require('../models/host.js')
        , song_history = require('../models/song_history.js')
        , song_vote = require('../models/song_vote.js');
module.exports = UserList;

function UserList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

UserList.prototype = {
    signup_user: function(req, res) {
        var email = req.body.email;
        flag = true;
        user.findOne({email: email}, function foundUser(err, item)
        {
            if (item === null) {
                flag = false;
            }
        });

        if (flag) {

            // Set up new User data
            newUser = new user();
//          newUser._id = mongoose.Types.ObjectId();
            newUser.firstName = req.body.firstname;
            newUser.lastName = req.body.lastname;
            newUser.userName = req.body.username;
            newUser.email = email;
            newUser.password = req.body.pwd;
            newUser.birthDate = req.body.birthdate;
            newUser.gender = req.body.gender;
            newUser.country = req.body.country;
            newUser.geoLocation = {
                lng: req.body.geolocation.lng,
                lat: req.body.geolocation.lat
            };

            newUser.save(function savedUser(err) {
                if (err) {
                    throw err;
                }
            });
            res.send(newUser);
        } else {
            res.send(false);
        }
    },
    get_user: function(req, res) {
        user.findOne({userName: req.body.username},
        function foundUser(err, item)
        {
            res.send(item);
        });
    },
    login_user: function(req, res) {
        user.findOne({email: req.body.email,
            password: req.body.pwd},
        function logUser(err, item) {
            if (item !== null) {
                // Update geoLocation 

                res.send(item);
            } else
            {
                res.send(false);
            }
        });
    },
    login_to_host: function(req, res)
    {
        host.findOne({bizName: req.body.bizname},
        function logUserToHost(err, item) {
            if (item === {})
            {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    },
    get_song_history: function(req, res)
    {
        song_history.find({user_id: req.body.userid},
        function logUserToHost(err, items) {
            res.send(items);
        });
    },
    like: function(req, res)
    {
        //Search in song_vote if exits else creates then search in song history
        song_vote.findOne({host_id: req.body.host_id, songId: req.body.song_id},
        function likeSong(err, item)
        {
            //If song_vote doesn't exist create a new song_vote
            if (item === null)
            {
                newSongVote = new song_vote();
                newSongVote.host_id = req.body.host_id;
                newSongVote.songId = req.body.song_id;
                newSongVote.like = 1;
                newSongVote.disLike = 0;
                newSongVote.lastVotedDate = Date.now();

                // Availible 20 minutes later only
                newSongVote.nextAvailibleVoteDate = Date.now();
                newSongVote.save(function savedUser(err) {
                    if (err) {
                        throw err;
                    }
                });
            } else //Song vote exists       
            {
                // Update like in song vote list
                song_vote.update({host_id: req.body.host_id, songId: req.body.song_id},
                {$inc: {like: 1}});

                // If song history doesn't exist create new song history
                song_vote.findOne({user_id: req.body.user_id, songId: req.body.song_id},
                function likeSongHistory(err, item)
                {
                    if (item === null)
                    {
                        newSongHistory = new song_history();
                        newSongHistory.user_id = req.body.user_id;
                        newSongHistory.song_id = req.body.song_id;
                        newSongHistory.like = 1;
                        newSongHistory.lastVotedDate = Date.now();
                    } else
                    {
                        // Update like in song history list
                        song_history.update({user_id: req.body.user_id, songId: req.body.song_id},
                        {$inc: {like: 1}});
                    }
                });
            }
        });
        res.send(true);
    },
    disLike: function(req, res)
    {
        //Search in song_vote if exits else creates also search in song history
        song_vote.findOne({host_id: req.body.host_id, songId: req.body.song_id},
        function dislikeSong(err, item)
        {
            //If song_vote doesn't exist create a new song_vote
            if (item === null)
            {
                newSongVote = new song_vote();
                newSongVote.host_id = req.body.host_id;
                newSongVote.songId = req.body.song_id;
                newSongVote.like = 1;
                newSongVote.disLike = 0;
                newSongVote.lastVotedDate = Date.now();

                // Availible 20 minutes later only
                newSongVote.nextAvailibleVoteDate = new Date(
                        (new Date()).getTime() + (20 * 60 * 1000));
                newSongVote.save(function savedUser(err) {
                    if (err) {
                        throw err;
                    }
                });
            } else
            {

                // Update like in song vote list
                song_vote.update({host_id: req.body.host_id, songId: req.body.song_id},
                {$inc: {disLike: 1}});
            }
            res.send(true);
        });
    }
};