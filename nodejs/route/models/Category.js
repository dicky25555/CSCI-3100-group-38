var mongoose = require('mongoose');

// Category model
var CategorySchema = mongoose.Schema({
    name: {type: String, required: true, unique: true}
});

var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
