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

function findTransaction(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Transaction.findOne(
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
            });
    }
    else
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
            });
    }
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
}*/

module.exports = router;
