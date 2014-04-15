var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var TaskSchema = new Schema({
    itemName      : String
  , itemId		  : long
  , itemCategory  : String
  , itemCompleted : { type: Boolean, default: false }
  , itemDate      : { type: Date, default: Date.now }
});

module.exports = mongoose.model('TaskModel123', TaskSchema);