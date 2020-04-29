// Category API
// Handles all requests that needed to interact with service categories
// Since there is no admin page, authentication has not been made
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Category = mongoose.model('Category');
var Service = mongoose.model('Service');

// Save a new category API - body: {name}
router.post('/', function(req, res)
{
  if (req.body["name"] !== undefined)
  {
    var name = req.body["name"];

    var category = new Category({
        name: name
    });

    category.save(function(err) {
        if (err)
        {
          console.log(err);
          res.send("Server: saving error!");
        }
        else
        {
          console.log("Created new category '" + name + "'!");
          res.status(201);
          res.send("Created new category!");
        }
    });
  }
  else
    res.send("Post parameters undefined");
});

// Delete a category API - params: /category_id/, returns {name} before delete
router.delete('/:id', function(req, res)
{
  if (req.params["id"] !== undefined)
    var id = req.params["id"];

  if (id !== undefined)
  {
    Service.findOne(
      {category: id},
      function(err, docs)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: delete error!");
        }
        else if (docs === null)
        {
          Category.findOneAndDelete(
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
                  console.log("Category does not exist!");
                  res.send("Not found");
                }
                else
                {
                  console.log("Deleted category!");
                  res.send(docs);
                }
          });
        }
        else
        {
          console.log("Deletion rejected");
          res.send("Reject deletion due to existence of services in the category");
        }
    });
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

// Update category API - params: /category_id/, body: {name}, returns {name} before update
router.put('/:id', function(req, res)
{
  if ((req.params["id"] !== undefined) && (req.body["name"] !== undefined))
  {
    var id = req.params["id"];
    var name = req.body["name"];

    Category.findOneAndUpdate(
      {_id: id},
      {name: name},
      function(err, docs)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: update error!");
        }
        else if (docs === null)
        {
          console.log("Category does not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Updated category!");
          res.send(docs);
        }
    });
  }
  else
    res.send("Cannot Update! Wrong URL!");
});

/* Retrieve category API
   - query: {id, name, exact, sortName}
   - empty query returns all category
   - returns [{_id, name}, ..]
   - sortName can be "asc" for ascending and "desc" for descending
   - exact can be "false" for wrapping search and "true" for exact search */
router.get('/', function(req, res)
{
  // Assume sorting ascending order name;
  var sort_params = {name: 1};

  if ((Object.keys(req.query).length === 0) || ((Object.keys(req.query).length === 1) && (req.query["sortName"] !== undefined)))
    search_params = {};
  else if (req.query["id"] !== undefined)
    search_params = {_id: req.query["id"]};
  else if (req.query["name"] !== undefined)
  {
    if ((req.query["exact"] !== undefined) && (req.query["exact"] == "false"))
      search_params = {name: {$regex: req.query["name"]}};
    else
      search_params = {name: req.query["name"]};
  }

  if ((req.query["sortName"] !== undefined) && (req.query["sortName"] == "desc"))
    sort_params = {name: -1};

  if (search_params !== undefined)
  {
    Category.find(search_params)
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
            console.log("Categories do not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Found category!");
            res.send(docs);
          }
        });
  }
  else
    res.send("Cannot Find! Not found!");
});

module.exports = router;
