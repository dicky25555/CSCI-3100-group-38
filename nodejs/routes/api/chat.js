// Chat API
// Handles all requests that needed to interact with Chats between services and customer
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth');

var Chat = mongoose.model('Chat');

// Send a new chat API - body: {customer_id, content} or {service_id, content}
router.post('/', auth.required, function(req, res)
{
  var user_id = req.user.id;
  var valid = true;

  // Check if the authenticated user is customer or service
  if (req.user.status == 'C')
  {
    add_params = {customer_id: user_id, origin: 'C'};

    if (req.body["service_id"] !== undefined)
      add_params.service_id = req.body["service_id"];
    else
      valid = false;
  }
  else if (req.user.status == 'S')
  {
    add_params = {service_id: user_id, origin: 'S'};

    if (req.body["customer_id"] !== undefined)
      add_params.customer_id = req.body["customer_id"];
    else
      valid = false;
  }

  if ((req.body["content"] !== undefined) && valid)
  {
    add_params.content = req.body["content"];

    var chat = new Chat(add_params);

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

/* Delete a chat API - params: /chat_id/
   Delete the chat with chat id that user has */
router.delete('/:id', auth.required, function(req, res)
{
  var user_id = req.user.id;

  if (req.params["id"] !== undefined)
    search_params = {_id: req.params["id"]};

  // Check if the authenticated user is customer or service
  if (req.user.status == 'C')
    search_params.customer_id = user_id;
  else if (req.user.status == 'S')
    search_params.service_id = user_id;

  if (req.params["id"] !== undefined)
  {
    Chat.findOneAndDelete(
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

/* Chat retrieval API
   - query: {dest_id}
   - returns [{customer_id, service_id, content, origin, date_created}, ...]
   - sorting is assumed to be ascending in time (like a chat flow)           */
router.get('/', auth.required, function(req, res)
{
  var user_id = req.user.id;

  // Check if the authenticated user is customer or service
  if (req.user.status == 'C')
  {
    search_params = {customer_id: user_id};
    sort_params = {service_id: 1};

    if (req.query["dest_id"] !== undefined)
      search_params.service_id = req.query["dest_id"];
  }
  else if (req.user.status == 'S')
  {
    search_params = {service_id: user_id};
    sort_params = {customer_id: 1};

    if (req.query["dest_id"] !== undefined)
      search_params.customer_id = req.query["dest_id"];
  }

  // Sort ascending time
  sort_params.date = 1;

  if (search_params !== undefined)
  {
    Chat.find(search_params)
        .sort(sort_params)
        .populate('service_id', 'username name')
        .populate('customer_id', 'username name')
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
