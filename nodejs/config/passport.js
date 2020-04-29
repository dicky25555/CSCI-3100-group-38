// Configuration for authentication
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Customer = mongoose.model('Customer');
var Service = mongoose.model('Service');


// Authentication strategy for customer
passport.use('local-customer', new LocalStrategy(
  function(username, password, cb) {
    Customer.findOne({ username: username })
      .then((user) => {
        if (!user)
          return cb(null, false)

        if (user.validatePassword(password))
        {
          var result = {
            id: user._id,
            status: 'C'
          };
          return cb(null, result);
        }
        else
          return cb(null, false);
    })
    .catch((err) => {
      cb(err);
    });
}));


// Authentication strategy for service
passport.use('local-service', new LocalStrategy(
  function(username, password, cb) {
    Service.findOne({ username: username })
      .then((user) => {
        if (!user)
          return cb(null, false)

        if (user.validatePassword(password))
        {
          var result = {
            id: user._id,
            status: 'S'
          };
          return cb(null, result);
        }
        else
          return cb(null, false);
    })
    .catch((err) => {
      cb(err, false);
    });
}));


// Storing and retrieveing session from client
passport.serializeUser(function(user, cb) {
    cb(null, {
      id: user.id,
      status: user.status
    });
});

passport.deserializeUser(function(value, cb) {
  var User;

  if (value.status == 'C')
    User = Customer;
  else
    User = Service;

  User.findById(value.id, function (err, user) {
    if (err)
      return cb(err);

    var result = {id: user.id, status: value.status};
    cb(null, result);
  });
});
