// Initialize sever
const express = require('express');
const app = express();

// Initialize body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@localhost/csci3100');

var db = mongoose.connection;

// Execute on connection failure
db.on('error', console.error.bind(console, 'Connection error:'));

// Execute once after openning
db.once('open', function ()
{
		console.log("Connection is open...");
});

// Category model
var CategorySchema = mongoose.Schema({
  name: {type: String, required: true, unique: true}
});

var Category = mongoose.model('Category', CategorySchema);

// Service model
var ServiceSchema = mongoose.Schema({
  category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
  username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String, required: true},
  address: {type: String, required: true},
  details: {type: String, required: true}
});

var Service = mongoose.model('Service', ServiceSchema);

// Review model
var ReviewSchema = mongoose.Schema({
  service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
  review_date: {type: Date, required: true},
  rating: {type: Number, required: true},
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
	customer_review: {type: String, required: true}
});

var Review = mongoose.model('Review', ReviewSchema);

// Customer model
var CustomerSchema = mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
	name: {type: String, required: true},
  details: {type: String, required: true}
});

var Customer = mongoose.model('Customer', CustomerSchema);

// Bookmark model
var BookmarkSchema = mongoose.Schema({
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'}
});

var Bookmark = mongoose.model('Bookmark', BookmarkSchema);

// Transcation model
var TransactionSchema = mongoose.Schema({
  customer_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
  service_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Service'},
  transaction_date: {type: Date, required: true},
  details: {type: String, required: true},
  isAccepted: {type: Boolean, required: true}
});

var Transaction = mongoose.model('Transaction', TransactionSchema);

// Database functions
// Create functions
function createCategory(name, callback)
{
  var category = new Category({
		name: name
	});

	category.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);
      success = false;
    }
    else
      console.log("Created new category '" + name + "'!");

    callback(success);
	});
}

function createService(category_id, username, password, name, address, details, callback)
{
  var service = new Service({
		category_id: category_id,
    username: username,
    password: password,
    name: name,
    address: address,
    details: details
	});

  service.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);

      success = false;
    }
    else
      console.log("Created new service '" + name + "'!");

  callback(success);
 });
}

function createReview(service_id, review_date, rating, customer_id, customer_review, callback)
{
  var review = new Review({
    service_id: service_id,
    review_date: review_date,
    rating: rating,
    customer_id: customer_id,
    customer_review: customer_review
  });

  review.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);

      success = false;
    }
    else
      console.log("Created new review!");

  callback(success);
 });
}

function createCustomer(username, password, name, details, callback)
{
  var customer = new Customer({
    username: username,
    password: password,
    name: name,
    details: details
  });

  customer.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);

      success = false;
    }
    else
      console.log("Created new customer!");

  callback(success);
 });
}

function createBookmark(customer_id, service_id, callback)
{
  var bookmark = new Bookmark({
    customer_id: customer_id,
    service_id: service_id
  });

  bookmark.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);

      success = false;
    }
    else
      console.log("Created new bookmark!");

  callback(success);
 });
}

function createTransaction(customer_id, service_id, transaction_date, details, isAccepted, callback)
{
  var transcation = new Transaction({
    customer_id: customer_id,
    service_id: service_id,
    details: details,
    isAccepted: isAccepted
  });

  transcation.save(function(err) {
    var success = true;

    if (err)
    {
      console.log(err);

      success = false;
    }
    else
      console.log("Created new transcation!");

  callback(success);
 });
}

// Find Functions
function findCategory(search_params, sorting, callback)
{
	var search_obj = null;
	var result_obj = null;
	var sorter = null;

	if (Object.keys(search_params).length == 1)
	{
		if (Object.keys(search_params)[0] == "id")
		{
			search_obj = {_id: search_params["id"]};
			result_obj = '_id name';
		}
		else if (Object.keys(search_params)[0] == "name")
		{
			search_obj = {name: {$regex: search_params["name"]}};
			result_obj = '_id name';
		}
		else
			console.log("Search param not recognized!");
	}
	else if (Object.keys(search_params).length == 2)
	{
		if (("name" in search_params) || ("id" in search_params))
		{
			search_obj = {_id: search_params["id"], name: search_params["name"]};
			result_obj = '_id name';
		}
		else
			console.log("Search param not recognized!");
	}
	else
		console.log("Search param has wrong number of arguments!");

	if (search_obj == null || result_obj == null || sorting == null)
	{
		console.log("Null objects detected! Returning false...");

		callback(false);
	}
	else
	{
		Category.find(
			search_obj,
			result_obj,
			function(err, docs) {
				var result = null;

				if (err)
					console.log(err);
				else if (docs === null)
					console.log("Category does not exists!")
				else
					result = docs

				callback(result);
		}).sort(sorting);
	}
}

function findService(search_params, search_result, sorting, callback)
{
	Service.find(search_params, search_result).populate("category_id").exec(
		function(err, docs) {
			var result = null;

			if (err)
				console.log(err);
			else if (docs === null)
				console.log("Service does not exists!")
			else
				result = docs

			callback(result);
	}).sort(sorting);
}

function findReview(search_params, search_result, sorting, callback)
{
	Review.find(
		search_params,
		search_result,
		function(err, docs) {
			var result = null;

			if (err)
				console.log(err);
			else if (docs === null)
				console.log("Review does not exists!")
			else
				result = docs

			callback(result);
	}).sort(sorting);
}

function findCustomer(search_params, search_result, sorting, callback)
{
	Customer.find(
		search_params,
		search_result,
		function(err, docs) {
			var result = null;

			if (err)
				console.log(err);
			else if (docs === null)
				console.log("Customer does not exists!")
			else
				result = docs

			callback(result);
	}).sort(sorting);
}


function findBookmark(search_params, search_result, sorting, callback)
{
	Bookmark.find(
		search_params,
		search_result,
		function(err, docs) {
			var result = null;

			if (err)
				console.log(err);
			else if (docs === null)
				console.log("Bookmark does not exists!")
			else
				result = docs

			callback(result);
	}).sort(sorting);
}


function findTransaction(search_params, search_result, sorting, callback)
{
	Transaction.find(
		search_params,
		search_result,
		function(err, docs) {
			var result = null;

			if (err)
				console.log(err);
			else if (docs === null)
				console.log("Transaction does not exists!")
			else
				result = docs

			callback(result);
	}).sort(sorting);
}

// Update functions
function updateCategory(id, name, callback)
{
	Category.findOneAndUpdate(
		{_id: id},
		{name: name},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

function updateService(id, category_id, username, password, name, address, details, callback)
{
	Service.findOneAndUpdate(
		{_id: id},
		{category_id: category_id,
		 username: username,
		 password: password,
	   address: address,
	   details: details},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

function updateReview(id, service_id, review_date, rating, customer_id, customer_review, callback)
{
	Review.findOneAndUpdate(
		{_id: id},
		{service_id: service_id,
     review_date: review_date,
     rating: rating,
     customer_id: customer_id,
     customer_review: customer_review},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

function updateCustomer(id, username, password, name, details, callback)
{
	Customer.findOneAndUpdate(
		{_id: id},
		{username: username,
     password: password,
     name: name,
     details: details},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

function updateBookmark(id, customer_id, service_id, callback)
{
	Review.findOneAndUpdate(
		{_id: id},
		{customer_id: customer_id,
     service_id: service_id},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

function updateTransaction(id, customer_id, service_id, transaction_date, details, isAccepted, callback)
{
	Transaction.findOneAndUpdate(
		{_id: id},
		{customer_id: customer_id,
     service_id: service_id,
     details: details,
     isAccepted: isAccepted},
		function(err, docs)
    {
      var result = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
	);
}

// Delete functions
function deleteCategory(id, callback)
{
  Category.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

function deleteService(id, callback)
{
	Service.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

function deleteReview(id, callback)
{
	Review.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

function deleteCustomer(id, callback)
{
	Customer.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

function deleteBookmark(id, callback)
{
	Bookmark.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

function deleteTransaction(id, callback)
{
	Transaction.findOneAndDelete(
    {_id: id},
    function(err, docs)
    {
      var docs = null;

      if (err)
        console.log(err);
			else
				result = docs;

      callback(result);
    }
  );
}

// Server functions
app.get('/', function(req, res)
{
});

// listen to port 3000
const server = app.listen(3000);
