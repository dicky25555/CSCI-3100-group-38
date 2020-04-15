var mongoose = require('mongoose');

// Review model
var ReviewSchema = mongoose.Schema({
    service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
    review_date: {type: Date, required: true, default: Date.now},
    rating: {type: Number, required: true},
    customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    customer_review: {type: String, required: true}
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
