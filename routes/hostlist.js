var mongoose = require('mongoose')
  , host = require('../models/host.js');

module.exports = HostList;

function HostList(connection) {
  mongoose.connect(connection);
}

HostList.prototype = {
  addHost: function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
	
    newUser = new host();
    newUser.Name = username;
    newUser.Password = password;
    newUser.save(function savedHost(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  }
}