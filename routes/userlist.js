var mongoose = require('mongoose')
  , user = require('../models/user.js');

module.exports = UserList;

function UserList(connection) {
  mongoose.connect(connection, function(err){
  // already connected... do nothing...
  
  });
}

UserList.prototype = {
  addUser: function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
	
    newUser = new user();
    newUser.Name = username;
    newUser.Password = password;
    newUser.save(function savedUser(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  }
}