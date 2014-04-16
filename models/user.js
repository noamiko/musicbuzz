var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User schemma 
var userSchema = new Schema({
    _id: ObjectIdUser,
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    birthDate: String,
    gender: String,
    country: String,
    geoLocation: {lng: Number, lat: Number}
});

module.exports = mongoose.model('Users', userSchema);