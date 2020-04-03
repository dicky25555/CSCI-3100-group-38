var mongoose = require('mongoose');

// Record model
var RecordSchema = mongoose.Schema({
    customer_username: {type: String},
    service_username: {type: String},
    transaction_date: {type: Date, required: true},
    details: {type: String, required: true},
});

var Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
