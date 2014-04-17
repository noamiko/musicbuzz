var mongoose = require('mongoose')
        , host = require('../models/host.js')
        , user = require('../models/user.js');
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
            if (item === null) {
                res.send(false);
            } else
            {
                res.send(item);
            }
        });
    },
    get_host_users: function(req, res)
    {
        user.find({hostId: req.body._id},
        function foundUsers(err, items)
        {
            res.send(items);
        });
    }
};