var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Basic User
var User = new Schema({
    username: String,
    email: String
  });

// MongoDB adds an 's' to Model name to create the database name.
// "Users" is the name of the entire Collection
// "User" is the name of the Model
module.exports = mongoose.model('User', User);
