// Bookmark API
// Handles all requests that needed to interact with Bookmark of each user
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth');

var Bookmark = mongoose.model('Bookmark');

// Bookmark a service for a customer API - body: {service_id}
router.post('/', auth.required, auth.customer, function(req, res)
{
  // Assume the input {service_id, customer_id} using POST
  if (req.body["service_id"] !== undefined)
  {
    var customer_id = req.user.id;
    var service_id = req.body["service_id"];

    var bookmark = new Bookmark({
        customer_id: customer_id,
        service_id: service_id
    });

    // Find any identical bookmarks to prevent duplicates
    Bookmark.findOne(
      {customer_id: customer_id,
       service_id: service_id},
      function(err, doc) {
        if (err)
        {
          console.log(err);
          res.send("Server: saving error!");
        }
        else if (doc == null)
        {
          bookmark.save(function(err) {
            if (err)
            {
              console.log(err);
              res.send("Server: saving error!");
            }
            else
            {
              console.log("Created new bookmark");
              res.status(201);
              res.send("Created new bookmark!");
            }
          });
        }
        else
        {
          console.log("Bookmark exists!");
          res.send("Duplicate!");
        }
      });
  }
  else
    res.send("Post parameters undefined");
});

// Delete customer bookmark API - params: {id}, returns bookmark before delete
router.delete('/:id', auth.required, auth.customer, function(req, res)
{
  var user_id = req.user.id;

  if (req.params["id"] !== undefined)
    search_params = {_id: req.params["id"]};

  search_params.customer_id = user_id;

  if (req.params["id"] !== undefined)
  {
    Bookmark.findOneAndDelete(
        search_params,
        function(err, docs)
        {
          if (err)
          {
            console.log(err);
            res.send("Server: delete error!");
          }
          else if (docs === null)
          {
            console.log("Bookmark does not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Deleted bookmark!");
            res.send(docs);
          }
        }
    );
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

/* Retrieve bookmarks of user API
   - query: {service_id, sortService}
   - returns [bookmark]
   - sortService can be "asc" for ascending name and "desc" for descending name */
router.get('/', auth.required, auth.customer, function(req, res)
{
  // Assume sorting ascending order name of service
  var sort_params = {"service_id.name": 1};
  var user_id = req.user.id;

  search_params = {customer_id: user_id};

  if ((req.query["sortService"] !== undefined) && (req.query["sortService"] == "desc"))
    sort_params = {"service_id.name": -1};

  if (search_params !== undefined)
  {
    Bookmark.find(search_params)
      .populate("service_id", '_id name address details')
      .sort(sort_params)
      .exec(
      function(err, docs) {
        if (err)
        {
          console.log(err);
          res.send("Server: find error!");
        }
        else if (docs.length == 0)
        {
          console.log("Bookmark do not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Found bookmark!");
          res.send(docs);
        }
      });
  }
  else
    res.send("Cannot Find! Not found!");
});

module.exports = router;
