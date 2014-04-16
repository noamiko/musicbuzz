var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Host schemma 
var hostSchemma = new Schema({
    _id: ObjectIdHost,
    bizName: String,
    userName: String,
    email: String,
    password: String,
    address: String,
    country: String,
    url: String,
    currentSongId: ObjectIdCurrentSong,
    nextSongId: ObjectIdNextSong,
    geoLocation: {lng: Number, lat: Number}
});

module.exports = mongoose.model('Hosts', hostSchemma);