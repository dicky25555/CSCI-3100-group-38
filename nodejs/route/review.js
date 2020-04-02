var express = require('express');
var router = express.Router();

var Review = require('./models/Review.js');

router.post("/",function(req, res)
{
  // Assume the input {service_id, review_date, rating, costumer_id, customer_review} using POST
  var condition = (req.body["service_id"] !== undefined) && (req.body["review_date"] !== undefined);
  condition = condition && (req.body["rating"] !== undefined);
  condition = condition && (req.body["customer_id"] !== undefined);
  condition = condition && (req.body["customer_review"] !== undefined);

  if (condition)
  {
    var review = new Review({
      service_id: req.body["service_id"],
      review_date: req.body["review_date"],
      rating: req.body["rating"],
      customer_id: req.body["customer_id"],
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

router.get('/find', function(req, res)
{
  // Assume sorting ascending date;
  var sort_params = {review_date: 1};

  // Assume input is json. search service_id or customer_id, sortDate sortRating
  // No input means show all
  if (Object.keys(req.query).length === 0)
    search_params = {};
  else if (req.query["service_id"] !== undefined)
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
      .populate('customer_id')
      .populate('service_id')
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

router.delete('/delete', function(req, res)
{
  // Assume input is using query. id=id
  if (req.query["id"] !== undefined)
    var id = req.query["id"];

  if (id !== undefined)
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
    res.send("Cannot Remove! Wrong Query!");
});

router.put('/update', function(req, res)
{
  // Assume the input in JSON. {id, service_id, review_date, rating, costumer_id, customer_review}
  var condition = (req.body["service_id"] !== undefined) && (req.body["review_date"] !== undefined);
  condition = condition && (req.body["rating"] !== undefined);
  condition = condition && (req.body["customer_id"] !== undefined);
  condition = condition && (req.body["customer_review"] !== undefined);
  condition = condition && (req.body["id"] !== undefined);

  if (condition)
  {
    Review.findOneAndUpdate(
      {_id: req.body["id"]},
      {service_id: req.body["service_id"],
        review_date: req.body["review_date"],
        rating: req.body["rating"],
        customer_id: req.body["customer_id"],
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
