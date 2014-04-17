var mongoose = require('mongoose')
        , host = require('../models/host.js');

module.exports = HostList;

function HostList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...
    });
}

HostList.prototype = {
    signup_host: function(req, res) {

        var bizName = req.body.bizName;
        var email = req.body.email;

        var flag = true;
        //Verify bizName and email are unique
        host.findOne({bizName: bizName}, function foundHost(err, item) {
            if (item === null) {
                flag = false;
            }
        });

        if (flag) {
            host.findOne({email: email}, function foundHost(err, item) {
                if (item === null) {
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
            newHost.password = req.body.password;
            newHost.address = req.body.address;
            newHost.country = req.body.country;
            newHost.url = req.body.url;
            newHost.currentSongId = req.body.currentSongId;
            newHost.nextSongId = req.body.nextSongId;
            newHost.geoLocation = {lng: req.body.lng, lat: req.body.lat};

            newHost.save(function savedHost(err) {
                if (err) {
                    throw err;
                }
            });
            res.render('index', {host: newHost});
        } else {
            res.render('index', {host: false});
        }
    },
    getHost: function(req, res) {
        host.findOne({bizName: req.body.bizName}, function foundHost(err, item) {
            res.render('index', {host: item});
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
        var password = req.body.password;

        //Verify email and password are valid
        host.find({email: email, password: password}, function foundHost(err, items) {
            if (items.length === 0) {
                res.render('index', {host: false});
            } else
            {
                res.render('index', {host: items});
            }
        });
    },
    login_to_host: function(req, res) {
        user.findOne({bizName: req.body.bizName},
        function logUserToHost(err, item) {
            res.render('index', {user: item});
        });
    }
};