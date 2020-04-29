// Bookmark model - store bookmark of user
var mongoose = require('mongoose');

var BookmarkSchema = mongoose.Schema({
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'}
});

var Bookmark = mongoose.model('Bookmark', BookmarkSchema);
