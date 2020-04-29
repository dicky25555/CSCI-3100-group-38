// Chat model - store chat line
var mongoose = require('mongoose');

var ChatSchema = mongoose.Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
    content: {type: String, required: true},
    date_created: {type: Date, default: Date.now, required: true},
    origin: {type: String, required: true}
});

var Chat = mongoose.model('Chat', ChatSchema);
