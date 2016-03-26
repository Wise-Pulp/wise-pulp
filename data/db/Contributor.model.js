var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Example schema with possible input types.
var Contributor = new Schema({
  can_id:   { type: String,
            required: false }, //candidate ID
  can_name: { type: String,
            required: false }, // Candidate name
  spe_id:   { type: String,
            required: false }, // Spender Id
  spe_name: { type: String,
            required: false },// Spender Name
  ele_type: { type: String,
            required: false }, // type of election the donation was made for
can_off_sta: { type: String,
            required: false }, // State of Candidate
can_off_district: {type: Number,
          required: false}, // Candidate District
  can_off:   { type: String,
            required: false }, //Candidate office
  can_par_aff: { type: String,
            required: false }, //Party affiliation of Candidate
  exp_amo: {type: Number,
          required: false}, // $ amount of specific expenditure
  exp_dat: {type: Date,
            required: false}, //dat of expenditure
  agg_amo: {type: Number,
          required: false}, //aggregate amount of contribution in $
  sup_opp: { type: String,
            required: false }, //in Support or Opposition
  pur:     { type: String,
            required: false }, //Purpose of expenditure
  pay:     { type: String,
            required: false }, // name of payee
  file_num: {type: Number,
          required:false}, //filing number
  amn_ind: { type: String,
            required: false }, //amendment indicator
  tra_id:  { type: String,
            required: false }, // Transaction ID
  ima_num: {type: Number,
          required:false}, // image number
  rec_dt: {type: Date,
            required: false}, // Filing Receipt date
  prev_file_num: {type: Number,
          required:false}, //previous filing number
  dissem_dt: {type: Date,
            required: false} //Date of Public Dissemenation
  });

// MongoDB adds an 's' to Model name to create the database name.
// "Contributors" is the name of the entire Collection
// "Contributor" is the name of the Model
module.exports = mongoose.model('Contributor', Contributor, 'Contributors');
