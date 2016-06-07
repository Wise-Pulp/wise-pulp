var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stringOpts = { type: String, required: false, sparse: true },
    numOpts = { type: Number, required: false, sparse: true }
//Example schema with possible input types.
var LDR_PAC_Sponsor = new Schema({
    com_id: stringOpts,
    com_nam: stringOpts,
    lin_ima: stringOpts,
    spo_nam: stringOpts,
    aff_com_nam: stringOpts,
    tot_rec: numOpts,
    tot_dis: numOpts,
    cas_on_han: numOpts,
    cov_end_dat: stringOpts
  });





// MongoDB adds an 's' to Model name to create the database name.
// "LDR_PAC_Sponsors" is the name of the entire Collection
// "LDR_PAC_Sponsor" is the name of the Model
module.exports = mongoose.model('LDR_PAC_Sponsor', LDR_PAC_Sponsor);