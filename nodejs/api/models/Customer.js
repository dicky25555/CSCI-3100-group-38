var mongoose = require('mongoose');

// Customer model
var CustomerSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    details: {type: String, required: true},
    hash: {type: String},
    salt: {type: String}
});

CustomerSchema.methods.setPassword = function(pwd)
{
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 10000, 512, 'sha512').toString('hex');
};

CustomerSchema.methods.validatePassword = function(pwd)
{
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

var Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
