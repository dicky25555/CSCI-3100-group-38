// Customer API
// Handles all requests that needed to interact with collections of Customer
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth');
var passport = require('passport');

var Customer = mongoose.model('Customer');
var Review = mongoose.model('Review');
var Bookmark = mongoose.model('Bookmark');
var Chat = mongoose.model('Chat');

// Sign Up API - body: {username, password, name, details}
router.post('/signup', auth.optional, function(req, res)
{
  var condition = (req.body["username"] !== undefined) && (req.body["password"] !== undefined);
  condition = condition && (req.body["name"] !== undefined);
  condition = condition && (req.body["details"] !== undefined);

  if (condition)
  {
    var customer = new Customer({
        username: req.body["username"],
        name: req.body["name"],
        details: req.body["details"]
    });

    customer.setPassword(req.body["password"]);

    customer.save(function(err) {
      if (err)
      {
        console.log(err);
        res.send("Server: saving error!");
      }
      else
      {
        console.log("Created new customer!");
        res.status(201);
        res.send("Created new customer!");
      }
    });
  }
  else
    res.send("Post parameters undefined");
});

// Login API - body: null
router.post('/login', auth.optional, passport.authenticate('local-customer', {}), function(req, res){
  res.send(req.isAuthenticated());
});

// Logout API - body: null
router.post('/logout', auth.required, function(req, res)
{
  req.logout();
  res.send(true);
});

/* Delete account of self API - body: null +
   Delete all other items related to account */
router.delete('/', auth.required, auth.customer, function(req, res)
{
  var id = req.user.id;

  if (id !== undefined)
  {
    Review.deleteMany(
      {customer_id: id},
      function(err)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: delete error!");
        }
        else
        {
          console.log("Deleted related reviews!");

          Bookmark.deleteMany(
            {customer_id: id},
            function(err)
            {
              if (err)
              {
                console.log(err);
                res.send("Server: delete error!");
              }
              else
              {
                console.log("Deleted related bookmarks!");

                Chat.deleteMany(
                  {customer_id: id},
                  function(err)
                  {
                    if (err)
                    {
                      console.log(err);
                      res.send("Server: delete error!");
                    }
                    else
                    {
                      console.log("Deleted related chats!");

                      Customer.findOneAndDelete(
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
                            console.log("Customer does not exist!");
                            res.send("Not found");
                          }
                          else
                          {
                            req.logout();
                            res.send();
                          }
                    });
                  }
                });
              }
          });
        }
    });
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

// Profile of self API - return {username, name, details}
router.get('/profile', auth.required, auth.customer, function(req, res)
{
  var id = req.user.id;
  search_param = {_id: id};

  if (search_param !== undefined)
  {
    Customer.findOne(
      search_param,
      'username name details',
      function(err, doc) {
        if (err)
        {
          console.log(err);
          res.send("Server: find error!");
        }
        else if (doc == null)
        {
          console.log("User does not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Found user!");
          res.send(doc);
        }
      });
  }
  else
    res.send("Cannot Find! Not found!");
});

/* Update account API
   - returns {username, name, address} before update
   - Can only update password only or {name, details} at a time
   - Cannot update username                                     */
router.put('/', auth.required, auth.customer, function(req, res)
{
  var id = req.user.id;
  search_param = {_id: id};

  if ((req.body["name"] !== undefined) && (req.body["details"] !== undefined))
  {
    update_params = {name: req.body["name"], details: req.body["details"]};
  }
  else if (req.body["password"] !== undefined)
  {
    // Encryption
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body["password"], salt, 10000, 512, 'sha512').toString('hex');

    update_params = {salt: salt, hash: hash};
  }

  if ((search_param !== undefined) && (update_params !== undefined))
  {
    Customer.findOneAndUpdate(
      search_param,
      update_params,
      function(err, doc)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: update error!");
        }
        else if (doc == null)
        {
          console.log("User does not exist!");
          res.send("Not found");
        }
        else
        {
          var undo = {
            username: doc.username,
            name: doc.name,
            details: doc.details
          };

          console.log("Updated user!");
          res.send(undo);
        }
      }
    );
  }
  else
    res.send("Cannot Update! Format Unknown!");
});

module.exports = router;
