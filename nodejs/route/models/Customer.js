var mongoose = require('mongoose');

// Customer model
var CustomerSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    details: {type: String, required: true}
});

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
