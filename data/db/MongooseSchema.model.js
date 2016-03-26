var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Example schema with possible input types.
var Contributor = new Schema({
  can_id: String, //candidate ID
  can_name: String, // Candidate name
  spe_id: String, // Spender Id
  spe_name: String,// Spender Name
  ele_type: String, // type of election the donation was made for
  can_off_sta: String, // State of Candidate
  can_off_district: Number, // Candidate District
  can_off: String, //Candidate office
  can_par_aff: String, //Party affiliation of Candidate
  exp_amo: Number, // $ amount of specific expenditure
  exp_dat: Date, //dat of expenditure
  agg_amo: Number, //aggregate amount of contribution in $
  sup_opp: String, //in Support or Opposition
  pur: String, //Purpose of expenditure
  pay: String, // name of payee
  file_num: Number, //filing number
  amn_ind: String, //amendment indicator
  tra_id: String, // Transaction ID
  ima_num: Number, // image number
  rec_dt: Date, // Filing Receipt date
  prev_file_num: Number, //previous filing number
  dissem_dt: Date //Date of Public Dissemenation
  });

// MongoDB adds an 's' to Model name to create the database name.
// "CollectionNames" is the name of the entire Collection
// "CollectionName" is the name of the Model
module.exports = mongoose.model('Contributor', Contributor, 'Contributors');
