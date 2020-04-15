var express = require('express');
var router = express.Router();

// API modules
var category = require('./category.js');
var review = require('./review.js');
var service = require('./service.js');
var bookmark = require('./bookmark.js');
var customer = require('./customer.js');
var chat = require('./chat.js');

// Handling database requests
router.use('/category', category);
router.use('/service', service);
router.use('/review', review);
router.use('/bookmark', bookmark);
router.use('/customer', customer);
router.use('/chat', chat);

module.exports = router;
