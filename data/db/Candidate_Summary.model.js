var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stringOpt = { type: String, required: false},
    numberOpt = { type: Number, required: false}

var CandidateSummarySchema = new Schema({
    "lin_ima": stringOpt,
    "can_id": stringOpt,
    "can_nam": stringOpt,
    "can_off": stringOpt,
    "can_off_sta": stringOpt,
    "can_off_dis": stringOpt,
    "can_par_aff": stringOpt,
    "can_inc_cha_ope_sea": stringOpt,
    "can_str1": [],
    "can_str2": [],
    "can_sta": stringOpt,
    "can_zip": numberOpt,
    "ind_ite_con": numberOpt,
    "ind_uni_con": numberOpt,
    "ind_con": numberOpt,
    "par_com_con": numberOpt,
    "oth_com_con": numberOpt,
    "can_con": numberOpt,
    "tot_con": numberOpt,
    "tra_fro_oth_aut_com": numberOpt,
    "can_loa": numberOpt,
    "oth_loa": numberOpt,
    "tot_loa": numberOpt,
    "off_to_ope_exp": numberOpt,
    "off_to_fun": numberOpt,
    "off_to_leg_acc": numberOpt,
    "oth_rec": numberOpt,
    "tot_rec": numberOpt,
    "ope_exp": numberOpt,
    "exe_leg_acc_dis": numberOpt,
    "fun_dis": numberOpt,
    "tra_to_oth_aut_com": numberOpt,
    "can_loa_rep": numberOpt,
    "oth_loa_rep": numberOpt,
    "tot_loa_rep": numberOpt,
    "ind_ref": numberOpt,
    "par_com_ref": numberOpt,
    "oth_com_ref": numberOpt,
    "tot_con_ref": numberOpt,
    "oth_dis": numberOpt,
    "tot_dis": numberOpt,
    "cas_on_han_beg_of_per": numberOpt,
    "cas_on_han_clo_of_per": numberOpt,
    "net_con": numberOpt,
    "net_ope_exp": numberOpt,
    "deb_owe_by_com": numberOpt,
    "deb_owe_to_com": numberOpt,
    "cov_sta_dat": stringOpt,
    "cov_end_dat": stringOpt
  });

// MongoDB adds an 's' to Model name to create the database name.
// "Contributors" is the name of the entire Collection
// "Contributor" is the name of the Model
module.exports = mongoose.model('CandidateSummary', CandidateSummarySchema);
