// Service model - store service info
var mongoose = require('mongoose');

var ServiceSchema = mongoose.Schema({
    category_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
    username: {type: String, required: true, unique: true},
    hash: {type: String},
    salt: {type: String},
    name: {type: String, required: true},
    address: {type: String, required: true},
    details: {type: String, required: true}
});

ServiceSchema.methods.setPassword = function(pwd)
{
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(pwd, this.salt, 10000, 512, 'sha512').toString('hex');
};

ServiceSchema.methods.validatePassword = function(pwd)
{
  const hash = crypto.pbkdf2Sync(pwd, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

var Service = mongoose.model('Service', ServiceSchema);
