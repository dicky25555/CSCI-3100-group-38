var app = require("./app");
var db = app.db;


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

// Functions for database
// Category functions
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

function findCategory(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Category.findOne(
            search_params,
            search_result,
            function(err, docs) {
                var result = null;

                if (err)
                    console.log(err);
                else if (docs === null)
                    console.log("Category does not exists!")
                else
                    result = docs

                callback(result);
            });
    }
    else
    {
        Category.find(
            search_params,
            search_result,
            function(err, docs) {
                var result = null;

                if (err)
                    console.log(err);
                else if (docs === null)
                    console.log("Category does not exists!")
                else
                    result = docs

                callback(result);
            });
    }
}


function findCategoryMain(search_params, callback)
{
    if (Object.keys(search_params).length == 1)
    {
        if (Object.keys(search_params)[0] == "id")
            findCategory({_id: search_params["id"]}, '_id name', true, function(result){callback(result)});
        else if (Object.keys(search_params)[0] == "name")
            findCategory({name: {$regex: search_params["name"]}}, '_id name', false, function(result){callback(result)});
        else
            console.log("Search param not recognized! Returning null...");
    }
    else if (Object.keys(search_params).length == 2)
    {
        if (("name" in search_params) || ("id" in search_params))
            findCategory({_id: search_params["id"], name: search_params["name"]}, '_id name', true, function(result){callback(result)});
        else
            console.log("Search param not recognized! Returning null...");
    }
    else
    {
        result = null

        console.log("Search param has wrong number of arguments! Returning null...");
        callback(result);
    }
}

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

// Review functions
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

function findReview(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Review.findOne(
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
            });
    }
    else
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
            });
    }
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

// Customer functions
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

function findBookmark(search_params, search_result, exact, callback)
{
    if (exact == true)
    {
        Bookmark.findOne(
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
            });
    }
    else
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
            });
    }
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
}

module.exports = dbServer;
