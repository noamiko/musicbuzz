var mongoose = require('mongoose')
  , user = require('../models/user.js');

module.exports = UserList;

function UserList(connection) {
  mongoose.connect(connection);
}

UserList.prototype = {
  addUser: function(req,res) {
    var item = req.body.item;
    newUser = new user();
    newUser.Id = 12341234123412;
    newUser.Name = item.name1;
    newUser.Password = item.password;
    newUser.save(function savedUser(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  }
}