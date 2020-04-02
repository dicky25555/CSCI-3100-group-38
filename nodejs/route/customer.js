var express = require('express');
var router = express.Router();

/* Collecting models
var Category = require('./models/Category.js');
var Customer = require('./models/Customer.js');
var Bookmark = require('./models/Bookmark.js');
var Service = require('./models/Service.js');
var Transaction = require('./models/Transaction.js');
var Review = require('./models/Review.js');
*/
/*
// Customer functions
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

function findCustomer(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Customer.findOne(
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
            });
    }
    else
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
            });
    }
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
*/

module.exports = router;
