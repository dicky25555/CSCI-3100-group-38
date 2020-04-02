/*  This route assumes all inputs (except post) to be in query
    because of the little number of inputs, hence more compact  */

var express = require('express');
var router = express.Router();

var Category = require('./models/Category.js');
var Service = require('./models/Service.js');

router.post('/', function(req, res)
{
  // Assume the input {name: name} using POST
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

router.delete('/delete', function(req, res)
{
  // Assume input is using query. id=id
  if (req.query["id"] !== undefined)
    var id = req.query["id"];

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
    res.send("Cannot Remove! Wrong Query!");
});

router.put('/update', function(req, res)
{
  // Assume the input is using query. id=id&name=name
  if ((req.query["id"] !== undefined) && (req.query["name"] !== undefined))
  {
    var id = req.query["id"];
    var name = req.query["name"];

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
    res.send("Cannot Update! Wrong query!");
});

router.get('/find', function(req, res)
{
  // Assume sorting ascending order name;
  var sort_params = {name: 1};

  // Assume input is query. id=id or name=name or name=name&exact=false
  // If no query, just send everything
  if (Object.keys(req.query).length === 0)
    search_params = {};
  else if (req.query["id"] !== undefined)
    search_params = {_id: req.query["id"]};
  else if (req.query["name"] !== undefined)
  {
    if ((req.query["exact"] !== undefined) && (req.query["exact"] == "false"))
      search_params = {name: {$regex: req.query["name"]}};
    else
      search_params = {name: req.query["name"]};

    if ((req.query["sortName"] !== undefined) && (req.query["sortName"] == "desc"))
      sort_params = {name: -1};
  }

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

router.get('/', function(req, res)
{
  res.sendFile(__dirname + "\\testerhtml\\newCategory.html");
});

module.exports = router;
