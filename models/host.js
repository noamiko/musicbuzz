var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var HostSchema = new Schema({
	Name		: String
  , Password	: String
});

module.exports = mongoose.model('hostModel', HostSchema);