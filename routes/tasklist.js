var mongoose = require('mongoose')
  , task = require('../models/task.js');

module.exports = TaskList;

function TaskList(connection) {
  mongoose.connect(connection);
}

TaskList.prototype = {
  showTasks: function(req, res) {
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

