var mongoose = require('mongoose');

// Service model
var ServiceSchema = mongoose.Schema({
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    address: {type: String, required: true},
    details: {type: String, required: true}
});

var Service = mongoose.model('Service', ServiceSchema);

module.exports = Service;
