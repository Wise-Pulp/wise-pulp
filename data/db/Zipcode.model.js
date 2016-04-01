var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var zipcodeSchema = new Schema({
	zipcode: String,
	district: String,
	state: String
});

module.exports = mongoose.model('Zipcode', zipcodeSchema);

