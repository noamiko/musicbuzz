var mongoose = require('mongoose')
        , host = require('../models/host.js');

module.exports = HostList;

function HostList(connection) {
    mongoose.connect(connection, function(err) {
        // already connected... do nothing...
    });
}

HostList.prototype = {
    addHost: function(req, res) {
        var bizName = req.body.bizName;
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var address = req.body.address;
        var country = req.body.country;
        var url = req.body.url;
        var currentSongId = req.body.currentSongId;
        var nextSongId = req.body.nextSongId;
        var geoLocation = {lng: req.body.lng, lat: req.body.lat}; //Suspect

        // Set up new Host data
        newUser = new host();
        newUser.bizName = bizName;
        newUser.userName = username;
        newUser.email = email;
        newUser.address = address;
        newUser.country = country;
        newUser.url = url;
        newUser.currentSongId = currentSongId;
        newUser.nextSongId = nextSongId;
        newUser.geoLocation = geoLocation;

        newUser.save(function savedHost(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/'); //TODO feedPage
    },
    getHost: function(req, res) {
        host.find({bizName: req.body.bizName});

        newUser.save(function savedHost(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
   },
    setHost: function(req, res) {
        // TODO
        newUser.save(function savedHost(err) {
            if (err) {
                throw err;
            }
        });
        res.redirect('/');
    }
}