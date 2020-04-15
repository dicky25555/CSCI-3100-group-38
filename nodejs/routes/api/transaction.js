// Logical problems in structure (when delete user, save transaction or not?)
var express = require('express');
var router = express.Router();

var Transaction = require('./models/Transaction.js');

router.post('/', function(req, res)
{
  // Assume the input {customer_id, service_id, details, isAccepted, transaction_date} using POST
  var condition = (req.body["customer_id"] !== undefined) && (req.body["transaction_date"] !== undefined);
  condition = condition && (req.body["service_id"] !== undefined);
  condition = condition && (req.body["details"] !== undefined);
  condition = condition && (req.body["isAccepted"] !== undefined);

  if (condition)
  {
    var transcation = new Transaction({
        customer_id: req.body["customer_id"],
        service_id: req.body["service_id"],
        details: req.body["details"],
        isAccepted: req.body["isAccepted"],
        transaction_date: req.body["transaction_date"]
    });

    transcation.save(function(err) {
      if (err)
      {
        console.log(err);
        res.send("Server: saving error!");
      }
      else
      {
        console.log("Created new transaction!");
        res.status(201);
        res.send("Created new transaction!");
      }
    });
  }
  else
    res.send("Post parameters undefined");
});

// NOT FINISHED - Accept multiple transcation???
// Need auth - only customer can delete transaction
router.delete('/:id', function(req, res)
{
  // Assume input is using url and data
  if (req.params["id"] !== undefined)
    var id = req.params["id"];

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
            console.log("Transaction does not exist!");
            res.send("Not found");
          }
          else
          {
            console.log("Deleted transaction!");
            res.send(docs);
          }
        }
    );
  }
  else
    res.send("Cannot Remove! Wrong Body!");
});

// Need auth - only the respective customer or service can see
router.get('/', function(req, res)
{
  // Assume sorting ascending transaction_date;
  var sort_params = {transaction_date: 1};

  // Assume input is query. search service_id or customer_id, sortServiceName sortDate sortCustomerName
   if (req.query["service_id"] !== undefined)
    search_params = {service_id: req.query["service_id"]};
  else if (req.query["customer_id"] !== undefined)
    search_params = {customer_id: req.query["customer_id"]};

  if ((req.query["sortDate"] !== undefined) && (req.query["sortDate"] == "desc"))
    sort_params = {transaction_date: -1};

  if (req.query["sortServiceName"] !== undefined)
  {
    if (req.query["sortServiceName"] == "asc")
      sort_params["service_id.name"] = 1;
    else if (req.query["sortServiceName"] == "desc")
      sort_params["service_id.name"] = -1;
  }

  if (req.query["sortCustomerName"] !== undefined)
  {
    if (req.query["sortCustomerName"] == "asc")
      sort_params["customer_id.name"] = 1;
    else if (req.query["sortCustomerName"] == "desc")
      sort_params["customer_id.name"] = -1;
  }

  if (search_params !== undefined)
  {
    Transaction.find(search_params)
      .populate('customer_id', '_id name details')
      .populate('service_id', '_id name address details')
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
          console.log("Transactions do not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Found transaction!");
          res.send(docs);
        }
      });
  }
  else
    res.send("Cannot Find! Not found!");
});

// Can only update the isAccepted
router.put('/', function(req, res)
{
  // Assume the input in JSON. {id, isAccepted}
  var condition = (req.body["id"] !== undefined) && (req.body["isAccepted"] !== undefined);

  if (condition)
  {
    Transaction.findOneAndUpdate(
      {_id: req.body["id"]},
      {isAccepted: req.body["isAccepted"]},
      function(err, docs)
      {
        if (err)
        {
          console.log(err);
          res.send("Server: update error!");
        }
        else if (docs === null)
        {
          console.log("Transaction does not exist!");
          res.send("Not found");
        }
        else
        {
          console.log("Updated transaction!");
          res.send(docs);
        }
      }
    );
  }
  else
    res.send("Cannot Update! Format Unknown!");
});

module.exports = router;
