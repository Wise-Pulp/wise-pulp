var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stringOpts = { type: String, required: false, sparse: true },
    numOpts = { type: Number, required: false, sparse: true }
//Example schema with possible input types.
var Administrative_Fine = new Schema({
    cas_num: numOpts,
    com_id: stringOpts,
    com_nam: stringOpts,
    rep_typ: stringOpts,
    rep_yea: numOpts,
    fin_amo: numOpts,
    off: stringOpts,
    sta: stringOpts,
    dis: numOpts,
    can_nam: stringOpts,
    lat_fil_not_fil: stringOpts,
    pai_yes_no: stringOpts
  });





// MongoDB adds an 's' to Model name to create the database name.
// "Administrative_Fines" is the name of the entire Collection
// "Administrative_Fines" is the name of the Model
module.exports = mongoose.model('Administrative_Fine', Administrative_Fine);