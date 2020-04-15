var mongoose = require('mongoose');

// Transcation model
var TransactionSchema = mongoose.Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
    transaction_date: {type: Date, required: true},
    details: {type: String, required: true},
    isAccepted: {type: Boolean, required: true}
});

var Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
