var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Basic User
var UpcomingCongressionalBillSchema = new Schema({
  billNumber: String,
  billName: String,
  downloadLink: String
});

module.exports = mongoose.model('UpcomingCongressionalBill', UpcomingCongressionalBillSchema);
