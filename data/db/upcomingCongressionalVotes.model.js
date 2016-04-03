var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Basic User
var UpcomingConVoteSchema = new Schema({
  billNumber: String
  billName: String
  downloadLink: String
});

// MongoDB adds an 's' to Model name to create the database name.
// "Users" is the name of the entire Collection
// "User" is the name of the Model
module.exports = mongoose.model('UpcomingConVote', UpcomingConVoteSchema);
