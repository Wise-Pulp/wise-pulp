
  var CandidateSummary = require('./data/db/Candidate_Summary.model');
  var skippedIndices = [];

        var iterations = cleanData.length;
        var i = 0;
        asyncLoop(iterations, function(loop) {
    // for(var i = 0; i < cleanData.length; i++) {
      console.log(loop.iteration(), cleanData[i].net_con)
        if(cleanData[i].net_con !== 0){
        // console.log("within the conditional");
        var candidate = new CandidateSummary();
        
        candidate.lin_ima = cleanData[i].lin_ima;
        candidate.can_id  = cleanData[i].can_id;
        candidate.can_nam = cleanData[i].can_nam;
        candidate.can_off = cleanData[i].can_off;
    candidate.can_off_sta = cleanData[i].can_off_sta;
    candidate.can_off_dis = cleanData[i].can_off_dis;
    candidate.can_par_aff = cleanData[i].can_par_aff;
    candidate.can_inc_cha_ope_sea = cleanData[i].can_inc_cha_ope_sea;
       candidate.can_str1 = cleanData[i].can_str1;
       candidate.can_str2 = cleanData[i].can_str2;
       candidate.can_sta  = cleanData[i].can_sta;
       candidate.can_zip  = cleanData[i].can_zip;
   candidate.ind_ite_con  = cleanData[i].ind_ite_con;
   candidate.ind_uni_con  = cleanData[i].ind_uni_con;
       candidate.ind_con  = cleanData[i].ind_con;
   candidate.par_com_con  = cleanData[i].par_com_con;
   candidate.oth_com_con  = cleanData[i].oth_com_con;
       candidate.can_con  = cleanData[i].can_con;
       candidate.tot_con  = cleanData[i].tot_con
   candidate.tra_fro_oth_aut_com = cleanData[i].tra_fro_oth_aut_com
        candidate.can_loa = cleanData[i].can_loa;
        candidate.oth_loa = cleanData[i].oth_loa;
        candidate.tot_loa = cleanData[i].tot_loa;
 candidate.off_to_ope_exp = cleanData[i].off_to_ope_exp;
     candidate.off_to_fun = cleanData[i].off_to_fun;
 candidate.off_to_leg_acc = cleanData[i].off_to_leg_acc;
        candidate.oth_rec = cleanData[i].oth_rec;
        candidate.tot_rec = cleanData[i].tot_rec;
        candidate.ope_exp = cleanData[i].ope_exp;
candidate.exe_leg_acc_dis = cleanData[i].exe_leg_acc_dis;
        candidate.fun_dis = cleanData[i].fun_dis;
  candidate.tra_to_oth_aut_com = cleanData[i].tra_to_oth_aut_com;
    candidate.can_loa_rep = cleanData[i].can_loa_rep;
    candidate.oth_loa_rep = cleanData[i].oth_loa_rep;
    candidate.tot_loa_rep = cleanData[i].tot_loa_rep;
        candidate.ind_ref = cleanData[i].ind_ref;
    candidate.par_com_ref = cleanData[i].par_com_ref;
    candidate.oth_com_ref = cleanData[i].oth_com_ref;
    candidate.tot_con_ref = cleanData[i].tot_con_ref;
        candidate.oth_dis = cleanData[i].oth_dis;
        candidate.cas_on_han_beg_of_per = cleanData[i].cas_on_han_beg_of_per;
        candidate.cas_on_han_clo_of_per = cleanData[i].cas_on_han_clo_of_per;
        candidate.net_con = cleanData[i].net_con;
    candidate.net_ope_exp = cleanData[i].net_ope_exp;
     candidate.deb_owe_by_com = cleanData[i].deb_owe_by_com;
     candidate.deb_owe_to_com = cleanData[i].deb_owe_to_com;
        candidate.cov_sta_dat = cleanData[i].cov_sta_dat;
        candidate.cov_end_dat = cleanData[i].con_end_dat;
      

             
             candidate.save(function (err, success) {
                    if (err) {
                      console.log(loop.iteration(), 'candidate was skipped.', err);
                      skippedIndices.push({ index: i, 
                                            net_contribution: cleanData[i].net_con
                                          });
                      i++;
                      loop.next();
                    } else {
                      i++;
                    console.log(loop.iteration(),'candidate has been saved');  
                   loop.next()
                    }                    
                  });
        } else if (i <= iterations){
          i++
          console.log(loop.iteration());
          loop.next();
        }

  },
    function(){
      console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
);