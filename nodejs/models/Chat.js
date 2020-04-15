var mongoose = require('mongoose');

// Chat model
var ChatSchema = mongoose.Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
    content: {type: String, required: true},
    date_created: {type: Date, default: Date.now, required: true}
});

var Chat = mongoose.model('Chat', ChatSchema);
