// tested!
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Bookmark = mongoose.model('Bookmark');

router.post('/', function(req, res)
{
  // Assume the input {service_id, customer_id} using POST
  if ((req.body["service_id"] !== undefined) && (req.body["customer_id"] !== undefined))
  {
    var customer_id = req.body["customer_id"];
    var service_id = req.body["service_id"];

    var bookmark = new Bookmark({
        customer_id: customer_id,
        service_id: service_id
    });

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
    res.send("Post parameters undefined");
});

router.delete('/:id', function(req, res)
{
  // Assume input is using param and data
  if (req.params["id"] !== undefined)
    var id = req.params["id"];

  if (id !== undefined)
  {
    Bookmark.findOneAndDelete(
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

router.get('/', function(req, res)
{
  // Assume sorting ascending order name of service
  var sort_params = {"service_id.name": 1};

  // Assume input is query. id=id or id=id&sortService=desc
  if (req.query["customer_id"] !== undefined)
    search_params = {customer_id: req.query["customer_id"]};

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
