var mongoose = require('mongoose');

// Bookmark model
var OnlineSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    status: {type: String},
    socket_id: {type: String, required: true}
});

var Online = mongoose.model('Online', OnlineSchema);
