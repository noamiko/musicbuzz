var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var UserSchema = new Schema({
    Id			: long
  , Name		: String
  , Password	: String
  , Host 		: { type: Boolean, default: false }
});

module.exports = mongoose.model('UserModel', UserSchema);