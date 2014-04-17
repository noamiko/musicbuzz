var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Song file schemma 
var songFileSchemma = new Schema({
    songFile: File
});

module.exports = mongoose.model('SongFile', songFileSchemma);