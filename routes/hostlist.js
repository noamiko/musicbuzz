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
            res.send(newHost);
        } else {
            res.send(false);
        }
    },
    getHost: function(req, res) {
        host.findOne({bizName: req.body.bizName}, function foundHost(err, item) {
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
        var password = req.body.password;

        //Verify email and password are valid
        host.findOne({email: email, password: password}, function foundHost(err, item) {
            if (item === null) {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    }
};