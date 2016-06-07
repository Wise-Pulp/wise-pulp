var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Example schema with possible input types.
var GeoJsonSchema = new Schema({
    "type": String,
    "features": Schema.Types.Mixed
  });





// MongoDB adds an 's' to Model name to create the database name.
// "Administrative_Fines" is the name of the entire Collection
// "Administrative_Fines" is the name of the Model
module.exports = mongoose.model('GeoJson', GeoJsonSchema);