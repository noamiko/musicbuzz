var mongoose = require('mongoose')
        , user = require('../models/user.js');

module.exports = UserList;

function UserList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...

    });
}

UserList.prototype = {
    addUser: function(req, res) {
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var birthDate = req.body.birthDate;
        var gender = req.body.gender;
        var country = req.body.country;
        var geoLocation = {lng: req.body.lng, lat: req.body.lat};

        // Set up new User data
        newUser = new user();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.userName = username;
        newUser.email = email;
        newUser.password = password;
        newUser.birthDate = birthDate;
        newUser.gender = gender;
        newUser.country = country;
        newUser.geoLocation = geoLocation;

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
    },
    getUser: function(req, res) {
        user.find({userName: req.body.username});
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
    },
    setUser: function(req, res) {
        // TODO
        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
    },
    login_user: function(req, res) {
        // TODO
        var found = user.find({email: req.body.email,
            password: req.body.password});

        // Return true if email and password are valid
        if (found !== null)
        {
            res.redirect('/'); // Feed page
        }

        newUser.save(function savedUser(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/'); // Login page
        return false;
    }
}