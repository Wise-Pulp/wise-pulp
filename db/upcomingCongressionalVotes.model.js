var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Basic User
var UpcomingCongressionalBillSchema = new Schema({
  billNumber: {type: String, unique:true},
  billName: String,
  fullTextLink: String,
  statusDescription: String,
  billDescription: String,
  sponsor: String

});

module.exports = mongoose.model('UpcomingCongressionalBill', UpcomingCongressionalBillSchema);