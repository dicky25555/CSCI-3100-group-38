// Manage live chat
var express = require('express');
var mongoose = require('mongoose');

var Online = mongoose.model('Online');

var socket_io = (socket) =>
{
  socket.on('disconnect', function ()
  {
    Online.findOneAndDelete({socket_id: socket.id}, function (err, doc) {
      if (err)
        console.log(err);
      else if (doc == null)
        console.log("Not found / Offline");
      else
        console.log("Offline");
    });
  });

  socket.on('setOnline', function(user){
    var online = new Online({
        id: user.id,
        status: user.status,
        socket_id: socket.id
    });

    online.save(function(err) {
      if (err)
      {
        console.log(err);
      }
      else
      {
        console.log("Created new connection");
      }
    });
  });

  // Receive the msg from client and then send to destination
  socket.on('sendMessage', function(dest, msg){
    Online.findOne({id: dest.id, status: dest.status}, 'socket_id', function (err, doc) {
      if (err)
        console.log(err);
      else if (doc == null)
        console.log("Not found / Offline");
      else
        socket.to(doc.socket_id).emit('receive', msg);
    });
  });
};

module.exports = socket_io;
