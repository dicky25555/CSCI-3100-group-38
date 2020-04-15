// Completed!
// Assume no updating chat (obviously)
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Chat = mongoose.model('Chat');

router.post('/', function(req, res)
{
  // Assume the input using POST
  var condition = (req.body["service_id"] !== undefined) && (req.body["customer_id"] !== undefined);
  condition = condition && (req.body["content"] !== undefined);

  if (condition)
  {
    var chat = new Chat({
        service_id: req.body["service_id"],
        customer_id: req.body["customer_id"],
        content: req.body["content"]
    });

    chat.save(function(err) {
        if (err)
        {
          console.log(err);
          res.send("Server: saving error!");
        }
        else
        {
          console.log("Created new chat line!");
          res.status(201);
          res.send("Created new chat line!");
        }
    });
  }
  else
    res.send("Post parameters undefined");
});

router.delete('/:id', function(req, res)
{
  // Assume input is using url and data
  if (req.params["id"] !== undefined)
    var id = req.params["id"];

  if (id !== undefined)
  {
    Chat.findOneAndDelete(
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
            console.log("Chat does not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Deleted chat!");
            res.send(docs);
          }
    });
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

router.get('/', function(req, res)
{
  // Sort ascending time
  sort_params = {date: 1};

  // Assume input is query. service_id=service_id or customer_id=customer_id
  if (req.query["service_id"] !== undefined)
    search_params = {service_id: req.query["service_id"]};
  else if (req.query["customer_id"] !== undefined)
    search_params = {customer_id: req.query["customer_id"]};

  if (search_params !== undefined)
  {
    Chat.find(search_params)
        .sort(sort_params)
        .populate('service_id customer_id', 'username')
        .exec(
        function(err, docs) {
          if (err)
          {
            console.log(err);
            res.send("Server: find error!");
          }
          else if (docs.length == 0)
          {
            console.log("Chat do not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Found chat!");
            res.send(docs);
          }
        });
  }
  else
    res.send("Cannot Find! Not found!");
});

module.exports = router;
