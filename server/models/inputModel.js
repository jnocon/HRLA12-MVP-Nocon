let mongoose = require('mongoose');

var inputSchema = mongoose.Schema({
    name: String,
    input: String
});

var Input = mongoose.model('Input', inputSchema);

module.exports = Input;