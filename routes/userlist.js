var mongoose = require('mongoose')
  , user = require('../models/user.js');

module.exports = UserList;

function UserList(connection) {
  mongoose.connect(connection);
}

UserList.prototype = {
  showUsers: function(req, res) {
    user.find(function foundTasks(err, items) {
      res.render('index',{title: 'My user List ', user: items})
    });
  },

  addUser: function(req,res) {
    var item = req.body.item;
    newUser = new user();
    newUser.Id = new ObjectID();
    newUser.Name = item.name;
    newUser.Password = item.password;
    newUser.save(function savedUser(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  },
}