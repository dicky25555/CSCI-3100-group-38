// Category model - store category of services
var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true}
});

var Category = mongoose.model('Category', CategorySchema);
