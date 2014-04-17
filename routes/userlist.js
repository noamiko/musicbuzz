var mongoose = require('mongoose')
        , user = require('../models/user.js')
        , host = require('../models/host.js')
        , song_history = require('../models/song_history.js');
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
        user.findOne({email: email},
        function foundUser(err, item)
        {
            if (item === null) {
                flag = false;
            }
        });

        if (flag) {

            // Set up new User data
            newUser = new user();
//          newUser._id = mongoose.Types.ObjectId();
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.userName = req.body.username;
            newUser.email = email;
            newUser.password = req.body.password;
            newUser.birthDate = req.body.birthDate;
            newUser.gender = req.body.gender;
            newUser.country = req.body.country;
            newUser.geoLocation = {lng: req.body.geoLocation.lng,
                lat: req.body.geoLocation.lat};

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
            password: req.body.password},
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
        host.findOne({bizName: req.body.bizName},
        function logUserToHost(err, item) {
            res.send(item);
        });
    },
    get_song_history: function(req, res)
    {
        song_history.find({user_id: req.body.user_id},
        function logUserToHost(err, items) {
            res.send(items);
        });
    },
    like: function(req, res)
    {

    }
};