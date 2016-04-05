var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Preset options for string and number values
var stringOpt = { type: String, required: false, sparse: true },
    numberOpt = { type: Number, required: false, sparse: true }


var CommitteeSummarySchema = new Schema({
    "com_nam": stringOpt,
    "lin_ima": stringOpt,
    "com_typ": stringOpt,
    "com_des": stringOpt,
    "fil_fre": stringOpt,
    "add": stringOpt,
    "cit": stringOpt,
    "sta": stringOpt,
    "zip": numberOpt,
    "tre_nam": stringOpt,
    "com_id" : stringOpt,
    "fec_ele_yea": numberOpt,
    "ind_ite_con": numberOpt,
    "ind_uni_con": numberOpt,
    "ind_con": numberOpt,
    "ind_ref": numberOpt,
    "par_com_con": numberOpt,
    "oth_com_con": numberOpt,
    "oth_com_ref": numberOpt,
    "can_con": numberOpt,
    "tot_con": numberOpt,
    "tot_con_ref": numberOpt,
    "can_loa": numberOpt,
    "can_loa_rep": numberOpt,
    "oth_loa": numberOpt,
    "oth_loa_rep": numberOpt,
    "tot_loa": numberOpt,
    "tot_loa_rep": numberOpt,
    "tra_fro_oth_aut_com": numberOpt,
    "tra_fro_non_fed_acc": numberOpt,
    "tra_fro_non_fed_lev_acc": numberOpt,
    "tot_non_fed_tra": numberOpt,
    "oth_rec": numberOpt,
    "tot_rec": numberOpt,
    "tot_fed_rec": numberOpt,
    "ope_exp": numberOpt,
    "sha_fed_ope_exp": numberOpt,
    "sha_non_fed_ope_exp": numberOpt,
    "tot_ope_exp": numberOpt,
    "off_to_ope_exp": numberOpt,
    "fed_sha_of_joi_act": numberOpt,
    "non_fed_sha_of_joi_act": numberOpt,
    "non_all_fed_ele_act_par": numberOpt,
    "tot_fed_ele_act": numberOpt,
    "fed_can_com_con": numberOpt,
    "fed_can_con_ref": numberOpt,
    "ind_exp_mad": numberOpt,
    "coo_exp_par": numberOpt,
    "loa_mad": numberOpt,
    "loa_rep_rec": numberOpt,
    "tra_to_oth_auth_com": numberOpt,
    "fun_dis": numberOpt,
    "off_to_fun_exp_pre": numberOpt,
    "exe_leg_acc_dis_pre": numberOpt,
    "off_to_leg_acc_exp_pre": numberOpt,
    "tot_off_to_ope_exp": numberOpt,
    "oth_dis": numberOpt,
    "tot_fed_dis": numberOpt,
    "tot_dis": numberOpt,
    "net_con": numberOpt,
    "net_ope_exp": numberOpt,
    "cas_on_han_beg_of_per": numberOpt,
    "cas_on_han_clo_of_per": numberOpt,
    "deb_owe_by_com": numberOpt,
    "deb_owe_to_com": numberOpt,
    "cov_sta_dat": stringOpt,
    "cov_end_dat": stringOpt,
    "pol_par_com_ref": numberOpt,
    "can_id": stringOpt,
    "cas_on_han_beg_of_yea": numberOpt,
    "cas_on_han_clo_of_yea": numberOpt,
    "exp_sub_to_lim_pri_yea_pre": numberOpt,
    "exp_sub_lim": numberOpt,
    "fed_fun": numberOpt,
    "ite_con_exp_con_com": numberOpt,
    "ite_oth_dis": numberOpt,
    "ite_oth_inc": numberOpt,
    "ite_oth_ref_or_reb": numberOpt,
    "ite_ref_or_reb": numberOpt,
    "oth_fed_ope_exp": numberOpt,
    "sub_con_exp": numberOpt,
    "sub_oth_ref_or_reb": numberOpt,
    "sub_ref_or_reb": numberOpt,
    "tot_com_cos": numberOpt,
    "tot_exp_sub_to_lim_pre": numberOpt,
    "uni_con_exp": numberOpt,
    "uni_oth_dis": numberOpt,
    "uni_oth_inc": numberOpt,
    "uni_oth_ref_or_reb": numberOpt,
    "uni_ref_or_reb": numberOpt,
    "org_tp": stringOpt


  });


module.exports = mongoose.model('CommitteeSummary', CommitteeSummarySchema);









