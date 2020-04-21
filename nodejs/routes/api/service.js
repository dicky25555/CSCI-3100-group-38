// tested till delete
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var auth = require('../auth');
var passport = require('passport');

var Service = mongoose.model('Service');
var Review = mongoose.model('Review');
var Bookmark = mongoose.model('Bookmark');
var Chat = mongoose.model('Chat');

router.post('/signup', auth.optional, function(req, res)
{
  // Assume the input {username, password, category_id, name, address, details} using POST
  var condition = (req.body["username"] !== undefined) && (req.body["password"] !== undefined);
  condition = condition && (req.body["category_id"] !== undefined);
  condition = condition && (req.body["name"] !== undefined);
  condition = condition && (req.body["address"] !== undefined);
  condition = condition && (req.body["details"] !== undefined);

  if (condition)
  {
    var service = new Service({
      category_id: req.body["category_id"],
      username: req.body["username"],
      name: req.body["name"],
      address: req.body["address"],
      details: req.body["details"]
    });

    service.setPassword(req.body["password"]);

    service.save(function(err) {
      if (err)
      {
        console.log(err);
        res.send("Server: saving error!");
      }
      else
      {
        console.log("Created new service!");
        res.status(201);
        res.send("Created new service!");
      }
    });
  }
  else
    res.send("Post parameters undefined");
});

// Login post
router.post('/login', auth.optional, passport.authenticate('local-service', {}), function(req, res){
  res.send(req.isAuthenticated());
});

// Logout post
router.post('/logout', auth.required, function(req, res)
{
  req.logout();
  res.send(true);
});

// NOT FINISHED - for now delete other than transaction
// Need auth first - option to delete account of self
router.delete('/', auth.required, auth.service, function(req, res)
{
  var id = req.user.id;

  if (id !== undefined)
  {
    Review.deleteMany(
      {service_id: id},
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
            {service_id: id},
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
                  {service_id: id},
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

                      Service.findOneAndDelete(
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
                            console.log("Service does not exist!");
                            res.send("Not found");
                          }
                          else
                            console.log("Deleted service!");
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

router.get('/profile', auth.required, auth.service, function(req, res)
{
  var id = req.user.id;
  var search_params = {_id: id};

  if (search_params !== undefined)
  {
    Service.findOne(search_params, 'username category_id name address details')
      .populate('category_id')
      .exec(function(err, doc) {
        if (err)
        {
          console.log(err);
          res.send("Server: find error!");
        }
        else if (doc.length == 0)
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

router.get('/', function(req, res)
{
  // Assume sorting ascending date;
  var sort_params = {name: 1};
  var search_params = {};

  // Assume input is query. search service_id or customer_id, sortDate sortRating, limit page
  if (req.query["name"] !== undefined)
    search_params.name = req.query["service_id"];

  if (req.query["address"] !== undefined)
    search_params.address = req.query["address"];

  if (req.query["details"] !== undefined)
    search_params.details = req.query["details"];

  if (req.query["category_id"] !== undefined)
    search_params.category_id = req.query["category_id"];

  if ((req.query["sortName"] !== undefined) && (req.query["sortName"] == "desc"))
    sort_params = {name: -1};

  if ((req.query["limit"] !== undefined) && (req.query["page"] !== undefined) && (search_params !== undefined))
  {
    Service.find(search_params, 'username category_id name address details')
      .populate('category_id')
      .sort(sort_params)
      .skip(parseInt(req.query["limit"]) * (parseInt(req.query["page"]) - 1))
      .limit(parseInt(req.query["limit"]))
      .exec(function(err, doc) {
        if (err)
        {
          console.log(err);
          res.send("Server: find error!");
        }
        else if (doc.length == 0)
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

// CANNOT UPDATE USERNAME
// either update passord only, or update data
router.put('/', auth.required, auth.service, function(req, res)
{
  var id = req.user.id;
  search_param = {_id: id};

  if ((req.body["name"] !== undefined) && (req.body["details"] !== undefined) && (req.body["category_id"] !== undefined) && (req.body["address"] !== undefined))
  {
    update_params = {name: req.body["name"], details: req.body["details"], category_id: req.body["category_id"], address: req.body["address"]};
  }
  else if (req.body["password"] !== undefined)
  {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body["password"], salt, 10000, 512, 'sha512').toString('hex');

    update_params = {salt: salt, hash: hash};
  }

  if ((search_param !== undefined) && (update_params !== undefined))
  {
    Service.findOneAndUpdate(
      search_param,
      update_params,
      function(err, doc)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: update error!");
        }
        else if (doc === null)
        {
          console.log("Service does not exist!");
          res.send("Not found");
        }
        else
        {
          var undo = {
            username: doc.username,
            name: doc.name,
            details: doc.details,
            address: doc.address,
            category_id: doc.category_id
          };

          console.log("Updated service!");
          res.send(undo);
        }
      }
    );
  }
  else
    res.send("Cannot Update! Format Unknown!");
});

module.exports = router;
