var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schemma 
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    birthDate: String,
    gender: String,
    country: String,
    hostId: {type: Schema.Types.ObjectId, ref: 'host'},
    geoLocation: {lng: Number, lat: Number}
});

module.exports = mongoose.model('Users', userSchema);