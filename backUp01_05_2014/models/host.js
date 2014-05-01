var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Host schemma 
var hostSchemma = new Schema({
    bizName: String,
    userName: String,
    email: String,
    password: String,
    address: String,
    country: String,
    url: String,
    currentSongId: {type: Schema.Types.ObjectId, ref: 'song'},
    nextSongId: {type: Schema.Types.ObjectId, ref: 'song'},
    geoLocation: {lng: Number, lat: Number}
});

module.exports = mongoose.model('Hosts', hostSchemma);