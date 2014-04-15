var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
	Name		: String
  , Password	: String
});

module.exports = mongoose.model('UserModel', UserSchema);