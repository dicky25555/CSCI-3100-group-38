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
// Service functions
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

function findService(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Service.findOne(
            search_params,
            search_result,
            function(err, docs) {
                var result = null;

                if (err)
                    console.log(err);
                else if (docs === null)
                    console.log("Service does not exists!")
                else
                    result = docs

                callback(result);
            });
    }
    else
    {
        Service.find(
            search_params,
            search_result,
            function(err, docs) {
                var result = null;

                if (err)
                    console.log(err);
                else if (docs === null)
                    console.log("Service does not exists!")
                else
                    result = docs

                callback(result);
            });
    }
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
*/

module.exports = router;
