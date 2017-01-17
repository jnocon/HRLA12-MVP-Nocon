let mongoose = require('mongoose');

var celebSchema = mongoose.Schema({
    name: String,
    phrase: String,
    picture: String,
    obituary: String
});

var Celeb = mongoose.model('Celeb', celebSchema);

module.exports = Celeb;