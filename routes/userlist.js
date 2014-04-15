var mongoose = require('mongoose')
  , task = require('../models/user.js');

module.exports = UserList;

function UserList(connection) {
  mongoose.connect(connection);
}

UserList.prototype = {
  showTasks: function(req, res) {
    user.find(function foundTasks(err, items) {
      res.render('index',{title: 'My user List ', user: items})
    });
  },

  addUser: function(req,res) {
    var item = req.body.item;
    newUser = new task();
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