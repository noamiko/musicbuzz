var mongoose = require('mongoose')
  , task = require('../models/task.js');

  module.exports = UserList;

function UserList(connection) {
  mongoose.connect(connection);
}

UserList.prototype = {
  addUser: function(req,res) {
    var item = req.body.item;
    newUser = new user();
    newUser.Name = item.name;
    newUser.Password = item.password;
    newUser.save(function savedUser(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  }
}

module.exports = TaskList;

function TaskList(connection) {
  mongoose.connect(connection);
}

TaskList.prototype = {
  showTasks: function(req, res) {
    task.find({itemCompleted: false}, function foundTasks(err, items) {
      res.render('index',{title: 'My ToDo List ', tasks: items})
    });
  },

  addTask: function(req,res) {
    var item = req.body.item;
    newTask = new task();
    newTask.itemName = item.name;
    newTask.itemCategory = item.category;
    newTask.itemId = new mongoose.Types.ObjectId();
    newTask.save(function savedTask(err){
      if(err) {
        throw err;
      }
    });
    res.redirect('/');
  },

  completeTask: function(req,res) {
    var completedTasks = req.body;
    for(taskId in completedTasks) {
      if(completedTasks[taskId]=='true') {
        var conditions = { _id: taskId };
        var updates = { itemCompleted: completedTasks[taskId] };
        task.update(conditions, updates, function updatedTask(err) {
          if(err) {
            throw err;
          }
        });
      }
    }
    res.redirect('/');
  }
}

