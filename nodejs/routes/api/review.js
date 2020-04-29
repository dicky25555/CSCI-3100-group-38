// Review API
// Handles all requests that needed to interact with Reviews on services page
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth');

var Review = mongoose.model('Review');

// Post a new review API - body: {service_id, review_date, rating, costumer_id, customer_review}
router.post("/", auth.required, auth.customer, function(req, res)
{
  var id = req.user.id;

  var condition = (req.body["service_id"] !== undefined);
  condition = condition && (req.body["rating"] !== undefined);
  condition = condition && (req.body["customer_review"] !== undefined);

  if (condition)
  {
    var review = new Review({
      service_id: req.body["service_id"],
      rating: req.body["rating"],
      customer_id: id,
      customer_review: req.body["customer_review"]
    });

    review.save(function(err) {
      if (err)
      {
        console.log(err);
        res.send("Server: saving error!");
      }
      else
      {
        console.log("Created new review!");
        res.status(201);
        res.send("Created new review!");
      }
    });
  }
  else
    res.send("Post parameters undefined");
});

/* Review retrieval API
   - query: {service_id, customer_id, sortDate, sortRating}
   - returns [{customer_id, service_id, content, origin, date_created}, ...]
   - query is interchangeable
   - sortDate and sortRating can be "asc" for ascending and "desc" for descending           */
router.get('/', function(req, res)
{
  // Assume sorting ascending date;
  var sort_params = {review_date: 1};
  var search_params = {};

  if (req.query["service_id"] !== undefined)
    search_params = {service_id: req.query["service_id"]};
  else if (req.query["customer_id"] !== undefined)
    search_params = {customer_id: req.query["customer_id"]};

  if ((req.query["sortDate"] !== undefined) && (req.query["sortDate"] == "desc"))
    sort_params = {review_date: -1};

  if (req.query["sortRating"] !== undefined)
  {
    if (req.query["sortRating"] == "asc")
      sort_params["rating"] = 1;
    else if (req.query["sortRating"] == "desc")
      sort_params["rating"] = -1;
  }

  if (search_params !== undefined)
  {
    Review.find(search_params)
      .sort(sort_params)
      .populate('customer_id', '_id name details')
      .populate('service_id', '_id name address details')
      .exec(
      function(err, docs) {
        if (err)
        {
          console.log(err);
          res.send("Server: find error!");
        }
        else if (docs.length == 0)
        {
          console.log("Reviews do not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Found review!");
          res.send(docs);
        }
      });
  }
  else
    res.send("Cannot Find! Not found!");
});

/* Delete a review API - params: /review_id/
   Delete the review with review id */
router.delete('/:id', auth.required, auth.customer, function(req, res)
{
  var user_id = req.user.id;

  if (req.params["id"] !== undefined)
    search_params = {_id: req.params["id"]};

  if (req.params["id"] !== undefined)
  {
    Review.findOneAndDelete(
        {_id: id},
        function(err, docs)
        {
          if (err)
          {
            console.log(err);
            res.send("Server: delete error!");
          }
          else if (docs === null)
          {
            console.log("Review does not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Deleted review!");
            res.send(docs);
          }
        }
    );
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

/* Update review API - DISABLED
   - returns review before update
   - body: {rating, customer_review, id}
   - To use change the auth middleware                          */
router.put('/', auth.required, auth.optional, function(req, res)
{
  var condition = (req.body["rating"] !== undefined);
  condition = condition && (req.body["customer_review"] !== undefined);
  condition = condition && (req.body["id"] !== undefined);

  if (condition)
  {
    Review.findOneAndUpdate(
      {_id: req.body["id"]},
      {review_date: Date.now(),
        rating: req.body["rating"],
        customer_review: req.body["customer_review"]},
      function(err, docs)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: update error!");
        }
        else if (docs === null)
        {
          console.log("Review does not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Updated review!");
          res.send(docs);
        }
      }
    );
  }
  else
    res.send("Cannot Update! Format Unknown!");
});

module.exports = router;
