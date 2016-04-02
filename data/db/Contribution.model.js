var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stringOpts = { type: String, required: false },
    numOpts = { type: Number, required: false },
//Example schema with possible input types.
var Contribution = new Schema({
  can_id:   stringOpts, //candidate ID
  can_name: stringOpts, // Candidate name
  spe_id:   stringOpts, // Spender Id
  spe_name: stringOpts,// Spender Name
  ele_type: stringOpts, // type of election the donation was made for
can_off_sta: stringOpts, // State of Candidate
can_off_district: numOpts, // Candidate District
  can_off:   stringOpts, //Candidate office
  can_par_aff: stringOpts, //Party affiliation of Candidate
  exp_amo: numOpts, // $ amount of specific expenditure
  exp_dat: stringOpts, //dat of expenditure
  agg_amo: numOpts, //aggregate amount of contribution in $
  sup_opp: stringOpts, //in Support or Opposition
  pur:     stringOpts, //Purpose of expenditure
  pay:     stringOpts, // name of payee
  file_num: numOpts, //filing number
  amn_ind: stringOpts, //amendment indicator
  tra_id:  stringOpts, // Transaction ID
  ima_num: numOpts, // image number
  rec_dt:  stringOpts, // Filing Receipt date
  prev_file_num: numOpts, //previous filing number
  dissem_dt: stringOpts //Date of Public Dissemenation
  });

// MongoDB adds an 's' to Model name to create the database name.
// "Contributors" is the name of the entire Collection
// "Contributor" is the name of the Model
module.exports = mongoose.model('Contribution', Contribution);
