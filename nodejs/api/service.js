// Logical problems in deleting, haven't develop authentication, haven't test
var express = require('express');
var router = express.Router();

var Service = require('./models/Service.js');

router.post('/', function(req, res)
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
        console.log("Created new customer!");
        res.status(201);
        res.send("Created new customer!");
      }
    });
  }
  else
    res.send("Post parameters undefined");
});

// NOT FINISHED - for now delete other than transaction
// Need auth first - option to delete account of self
router.delete('/:id', function(req, res)
{
  // Assume input is using url
  if (req.params["id"] !== undefined)
    var id = req.params["id"];

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
                      console.log("Customer does not exist!");
                      res.send("Not found");
                    }
                    else
                      console.log("Deleted customer!");
                });
              }
          });
        }
    });
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

// Need auth first - for getting personal info of self
router.get('/', function(req, res)
{
  // Assume input is query. search id or username
  if (req.query["id"] !== undefined)
    search_params = {_id: req.query["id"]};
  else if (req.query["username"] !== undefined)
    search_params = {username: req.query["username"]};

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

// Need auth first - for updating personal info of self
// CANNOT UPDATE USERNAME
// either update passord only, or update data
router.put('/', function(req, res)
{
  // Assume the input in JSON. {username, category_id, name, details} or {username, password}
  if (req.body["username"] !== undefined)
    search_param = {username: req.body["username"]};

  if ((req.body["name"] !== undefined) && (req.body["details"] !== undefined) && (req.body["category_id"] !== undefined))
  {
    update_params = {name: req.body["name"], details: req.body["details"], category_id: req.body["category_id"]};
  }
  else if (req.body["password"] !== undefined)
  {
    var salt = crypto.randomBytes(16).toString('hex');
    var hash = crypto.pbkdf2Sync(req.body["password"], salt, 10000, 512, 'sha512').toString('hex');

    update_params = {salt: salt, hash: hash};
  }

  if ((search_param !== undefined) && (update_param !== undefined))
  {
    Service.findOneAndUpdate(
      search_param,
      update_params,
      function(err, docs)
      {
        if (err, docs)
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
