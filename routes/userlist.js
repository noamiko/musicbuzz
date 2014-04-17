var mongoose = require('mongoose')
        , user = require('../models/user.js')
        , host = require('../models/host.js');

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
            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.userName = req.body.username;
            newUser.email = email;
            newUser.password = req.body.password;
            newUser.birthDate = req.body.birthDate;
            newUser.gender = req.body.gender;
            newUser.country = req.body.country;
            newUser.geoLocation = {lng: req.body.lng, lat: req.body.lat};

            newUser.save(function savedUser(err) {
                if (err) {
                    throw err;
                }
            });
            res.render('index', {user: newUser});
            res.send(404);
        } else {
            res.render('index', {user: false});
        }
    },
    getUser: function(req, res) {
        user.findOne({userName: req.body.username},
        function foundUser(err, item)
        {
            res.render('index', {user: item});
        });
    },
    login_user: function(req, res) {
        found = true;
        user.findOne({email: req.body.email,
            password: req.body.password},
        function logUser(err, item) {
            if (item === null) {
                found = false;
            }
        });
        res.render('index', {user: found});
    },
    login_to_host: function(req, res) {
        host.findOne({bizName: req.body.bizName},
        function logUserToHost(err, item) {
            res.render('index', {host: item});
        });
    }
};