var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Basic User
var UserOpinionSchema = new Schema({
  billNumber: String,
  decision: Boolean,
  votedAt: Number
});

module.exports = mongoose.model('UserOpinion', UserOpinionSchema);