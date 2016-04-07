var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var stringOpt = { type: String, required: false};
var numberOpt = { type: Number, required: false};


var zipcodeSchema = new Schema({
  zipcode: numberOpt,
  district: numberOpt,
  state: stringOpt
});

module.exports = mongoose.model('Zipcode', zipcodeSchema);

