var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var fs = require('fs');
var Promise = require('bluebird');
var bodyParser = require('body-parser');


var config = require('./config');
var cleanData;
//var config = require('./config');

//connect to local host
//var db = 'mongodb://localhost/Contributors';

//connect to heroku
//var db = config.dbURI2;

//mongoose.connect(db);


//THIS IS THE DATA CONVERSION MACHINE!!!!!!!!!
////////////////////////////

// //INSERT YOUR CSV DATA HERE!
var csvFile = './data/'
// //DESIRED OUTPUT DIRECTORY!
var output = './data/Contributors2012.json';
// //START SERVER AND WAIT FOR MAGIC!





//Converter Class
var Converter  = require('csvtojson').Converter;
var converter  = new Converter({});

// converter.fromFile(csvFile, function(err, result) {
//    if(err) console.log(err)
//    console.log(result);
//   fs.writeFile(output, JSON.stringify(result), function(err) {
//      if(err) {
//      console.log(err);
//      }
//    })
// });

// var JSONdata = fs.readFileSync(output);
//     JSONdata = JSON.parse(JSONdata.toString())
    // console.log(JSONdata) // => csv in JSON.
    //console.log("dirtyData********", JSONdata[3]);




/*
* Format data to be used with GenerateLayers
**/
// var dataArray = [];
//     for(var i = 0; i < JSONdata.length; i++){
//       if(JSONdata[i].net_con !== 0){
//         var temp = [];
//         temp.name = JSONdata[i].can_nam;
//         temp.push(JSONdata[i].ind_uni_con);
//         temp.push(JSONdata[i].ind_ite_con);
//         temp.push(JSONdata[i].par_com_con);
//         temp.push(JSONdata[i].oth_com_con);
//         temp.push(JSONdata[i].can_con);
//         temp.push(JSONdata[i].tot_con);
//         //temp.push(JSONdata[i].net_con);
//         dataArray.push(temp);        
//       }
//     }
//console.log(dataArray);

////////// Asynchronous Loop... A beautiful thing.
function asyncLoop(iterations, func, callback) {
var index = 0;
var done = false;
var loop = {
    next: function() {
        if (done) {
            return;
        }

        if (index < iterations) {
            index++;
            func(loop);

        } else {
            done = true;
            callback();
        }
    },

    iteration: function() {
        return index - 1;
    },

    break: function() {
        done = true;
        callback();
    }
};
loop.next();
return loop;
}

/*
* Takes dates formatted as YYYY/MM/DD
* and returns a numeric value representing that date
**/

function fixDates(BadlyFormattedDate) {
  var regEx = BadlyFormattedDate.replace(/\-/g, '++');
  console.log('this is regex', regEx);
    regEx = regEx.replace(/\//g, '++')
  console.log('this is regex2', regEx);

  var storage = [];
  var results = '';
  for(var i = 2; i >= 0; i--) {
    var temp = regEx.split('++');
    storage.push(temp[i]);
    console.log(storage);
  } 
  results = storage[0] + '-' + storage[1] + '-' + storage[2];
  console.log(results)
  return Date.parse(results);
}





// /*
// * Parses Object data for integers. Removes '$', and ',' then using
// * the Number() method to parse the integers. 
// **/
function mixedDataCleaner (arrayOfObjects) {
  function parseCurrency(aString){
    var monk = aString.replace(/\$/g, ''),
        kungfu = monk.replace(/\,/g, ''),
        master = Number(kungfu);
        return master;
  }
  

  for(var i = 0; i < arrayOfObjects.length; i++) {
    //For an Array containing arrays (custom data)
    if(Array.isArray(arrayOfObjects[i])) {
      for(var q = 0; q < arrayOfObjects[i].length; q++){
        if(arrayOfObjects[i][q]){
          arrayOfObjects[i][q] = parseCurrency(arrayOfObjects[i][q]);       
        }
      }      
    } else {
    //For an Array containing Objects (JSON)
      for(var j in arrayOfObjects[i]){
        if( arrayOfObjects[i][j][0] === '$' || arrayOfObjects[i][j][0] === '-' ) {
          arrayOfObjects[i][j] = parseCurrency(arrayOfObjects[i][j]);
          // console.log(arrayOfObjects[i][j])
        }
      }
    }



  }
  return arrayOfObjects;
}


/*
* Parses Object data for integers. Removes ',' or '%' then uses
* the JSON.parse() to parse the integers. 
**/

function numericDataCleaner(arrayOfObjects) {

  function parseNumbers(numberString) {
    var myKicksGameIs = JSON.stringify(numberString),
        justRude = myKicksGameIs.replace(/\,/g, ''),
        dontGet = JSON.parse(justRude),
        jiujitsued = JSON.parse(dontGet);
        return jiujitsued;
  }
  function parsePercentage(numberString){
    var soySauce = JSON.stringify(numberString),
        wasabi = soySauce.replace(/\%/g, ''),
        seaweed = JSON.parse(wasabi),
        sushi = JSON.parse(seaweed);
        return sushi;
  }

  for(var i = 0; i < arrayOfObjects.length; i++){
    for(var q in arrayOfObjects[i]) {
      var currentJSON = arrayOfObjects[i];

      //remove all '%'
      if(currentJSON[q][currentJSON[q].length - 1] === '%'){
        currentJSON[q] = parsePercentage(currentJSON[q]);
      }
      //remove all ',' 
      else if (!isNaN(Number(currentJSON[q][currentJSON[q].length - 1]))) {
        currentJSON[q] = parseNumbers(currentJSON[q]);
      }
    }
  }
  return arrayOfObjects;
}




//Generate Layered Data. This is specifically used with Stacked Bar Graph
function generateLayers(arrayOfArrays) {
  var layers = [];
  for(var i = 0; i < arrayOfArrays.length; i++) {
    var candidate = [];
    for(var q = 0; q < arrayOfArrays[i].length; q++) {
      candidate.push({ x: q, y: arrayOfArrays[i][q] })
    }
    layers.push(candidate);
  }
  return layers;
}

// var generatedLayers = generateLayers(cleanData);

//console.log(generatedLayers);

// module.exports.generatedLayers = generatedLayers;




//   ////////////////////////////
//   //Time To Upload data to Mongolab
//   ///////////////////////////





/////////////////////////////// Upload Candidate summary data

  var CandidateSummary = require('./data/db/Candidate_Summary.model');
//   var skippedIndices = [];
//   cleanData = mixedDataCleaner(JSONdata);

//         var iterations = cleanData.length;
//         var i = 0;
//         asyncLoop(iterations, function(loop) {
        
//         console.log(loop.iteration(), cleanData[i].net_con)

//         if(cleanData[i].net_con !== 0){

//         var candidate = new CandidateSummary();
        
//         candidate.lin_ima = cleanData[i].lin_ima;
//         candidate.can_id  = cleanData[i].can_id;
//         candidate.can_nam = cleanData[i].can_nam;
//         candidate.can_off = cleanData[i].can_off;
//     candidate.can_off_sta = cleanData[i].can_off_sta;
//     candidate.can_off_dis = cleanData[i].can_off_dis;
//     candidate.can_par_aff = cleanData[i].can_par_aff;
//     candidate.can_inc_cha_ope_sea = cleanData[i].can_inc_cha_ope_sea;
//        candidate.can_sta  = cleanData[i].can_sta;
//        candidate.can_zip  = cleanData[i].can_zip;
//    candidate.ind_ite_con  = cleanData[i].ind_ite_con;
//    candidate.ind_uni_con  = cleanData[i].ind_uni_con;
//        candidate.ind_con  = cleanData[i].ind_con;
//    candidate.par_com_con  = cleanData[i].par_com_con;
//    candidate.oth_com_con  = cleanData[i].oth_com_con;
//        candidate.can_con  = cleanData[i].can_con;
//        candidate.tot_con  = cleanData[i].tot_con
//    candidate.tra_fro_oth_aut_com = cleanData[i].tra_fro_oth_aut_com
//         candidate.can_loa = cleanData[i].can_loa;
//         candidate.oth_loa = cleanData[i].oth_loa;
//         candidate.tot_loa = cleanData[i].tot_loa;
//  candidate.off_to_ope_exp = cleanData[i].off_to_ope_exp;
//      candidate.off_to_fun = cleanData[i].off_to_fun;
//  candidate.off_to_leg_acc = cleanData[i].off_to_leg_acc;
//         candidate.oth_rec = cleanData[i].oth_rec;
//         candidate.tot_rec = cleanData[i].tot_rec;
//         candidate.ope_exp = cleanData[i].ope_exp;
// candidate.exe_leg_acc_dis = cleanData[i].exe_leg_acc_dis;
//         candidate.fun_dis = cleanData[i].fun_dis;
//   candidate.tra_to_oth_aut_com = cleanData[i].tra_to_oth_aut_com;
//     candidate.can_loa_rep = cleanData[i].can_loa_rep;
//     candidate.oth_loa_rep = cleanData[i].oth_loa_rep;
//     candidate.tot_loa_rep = cleanData[i].tot_loa_rep;
//         candidate.ind_ref = cleanData[i].ind_ref;
//     candidate.par_com_ref = cleanData[i].par_com_ref;
//     candidate.oth_com_ref = cleanData[i].oth_com_ref;
//     candidate.tot_con_ref = cleanData[i].tot_con_ref;
//         candidate.oth_dis = cleanData[i].oth_dis;
//         candidate.cas_on_han_beg_of_per = cleanData[i].cas_on_han_beg_of_per;
//         candidate.cas_on_han_clo_of_per = cleanData[i].cas_on_han_clo_of_per;
//         candidate.net_con = cleanData[i].net_con;
//     candidate.net_ope_exp = cleanData[i].net_ope_exp;
//      candidate.deb_owe_by_com = cleanData[i].deb_owe_by_com;
//      candidate.deb_owe_to_com = cleanData[i].deb_owe_to_com;
//         candidate.cov_sta_dat = cleanData[i].cov_sta_dat;
//         candidate.cov_end_dat = cleanData[i].cov_end_dat;
      

             
//              candidate.save(function (err, success) {
//                     if (err) {
//                       console.log(loop.iteration(), 'candidate was skipped.', err);
//                       skippedIndices.push({ index: i, 
//                                             net_contribution: cleanData[i].net_con,
//                                             error: err
//                                           });
//                       i++;
//                       loop.next();
//                     } else {
//                       i++;
//                     console.log(loop.iteration(),'candidate has been saved');  
//                    loop.next();
//                     }                    
//                   });
//         } else if (i <= iterations){
//           i++;
//           console.log(loop.iteration());
//           loop.next();
//         }

//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );


/////////////////////////////////// Upload Contribution Data


      
  var Contribution = require('./data/db/Contribution.model');
//   var skippedIndices = [];
//   cleanData = mixedDataCleaner(JSONdata);

//   var iterations = cleanData.length;
//   var i = 0;
//   asyncLoop(iterations, function(loop) {
// console.log(loop.iteration(), cleanData[i].exp_amo)

//   var contribution = new Contribution();
//       contribution.can_id = cleanData[i].can_id; 
//       contribution.can_name = cleanData[i].can_name;
//       contribution.spe_id = cleanData[i].spe_id;
//       contribution.spe_name = cleanData[i].spe_name;
//       contribution.ele_type = cleanData[i].ele_type;
//       contribution.can_off_sta = cleanData[i].can_off_sta;
//       contribution.can_off_dis = cleanData[i].can_off_dis;
//       contribution.can_off = cleanData[i].can_off;
//       contribution.can_par_aff = cleanData[i].can_par_aff;
//       contribution.exp_amo = cleanData[i].exp_amo;
//       contribution.exp_dat = cleanData[i].exp_dat;
//       contribution.agg_amo = cleanData[i].agg_amo;
//       contribution.sup_opp = cleanData[i].sup_opp;
//       contribution.pur = cleanData[i].pur;
//       contribution.pay = cleanData[i].pay;
//       contribution.file_num = cleanData[i].file_num;
//       contribution.amn_ind = cleanData[i].amn_ind;
//       contribution.tra_id = cleanData[i].tra_id;
//       contribution.ima_num = cleanData[i].ima_num;
//       contribution.rec_dt = cleanData[i].rec_dt;
//       contribution.prev_file_num = cleanData[i].prev_file_num;
  

       
        
//       contribution.save(function (err, success) {
//               if (err) {
//                 console.log(loop.iteration(), 'contribution was skipped.', err);
//                 skippedIndices.push({ index: i, 
//                                       contribution_amo: cleanData[i].exp_amo,
//                                       error: err
//                                     });
//                 if(i < iterations){
//                   i++;
//                   loop.next();
//                 } else { loop.next(); }

//                 } else {
//                   if(i < iterations){
//                     i++;
//                     console.log(loop.iteration(),'contribution has been saved');  
//                     loop.next();
//                     }
//                   }                    
//                 });
//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );





///////////////////////////////////// Upload General Election Voter Turnout Data

  var GE_Turnout = require('./data/db/Gen_Election_Voter_Turnout.model');
//   var skippedIndices = [];
//   cleanData = numericDataCleaner(JSONdata);

//   var iterations = cleanData.length;
//   var i = 0;
//   asyncLoop(iterations, function(loop) {
// console.log(loop.iteration(), cleanData[i].Year)

//   var turnout = new GE_Turnout();
//       turnout.Year = cleanData[i].Year;
//       turnout["ICPSR State Code"] = cleanData[i]["ICPSR State Code"];
//       turnout["Alphanumeric State Code"] = cleanData[i]["Alphanumeric State Code"];
//       turnout["State"] = cleanData[i]["State"];
//       turnout["VEP Total Ballots Counted (%)"] = cleanData[i]["VEP Total Ballots Counted"];
//       turnout["VEP Highest Office (%)"] = cleanData[i]["VEP Highest Office"];
//       turnout["VAP Highest Office (%)"] = cleanData[i]["VAP Highest Office"];
//       turnout["Total Ballots Counted"] = cleanData[i]["Total Ballots Counted"];
//       turnout["Highest Office"] = cleanData[i]["Highest Office"];
//       turnout["Voting-Eligible Population (VEP)"] = cleanData[i]["Voting-Eligible Population (VEP)"];
//       turnout["Voting-Age Population (VAP)"] = cleanData[i]["Voting-Age Population (VAP)"];
//       turnout["% Non-citizen"] = cleanData[i]["% Non-citizen"];
//       turnout["Prison"] = cleanData[i]["Prison"];
//       turnout["Probation"] = cleanData[i]["Probation"];
//       turnout["Parole"] = cleanData[i]["Parole"];
//       turnout["Total Ineligible Felon"] = cleanData[i]["Total Ineligible Felon"];
//       turnout["Overseas Eligible"] = cleanData[i]["Overseas Eligible"];
      

       
        
//       turnout.save(function (err, success) {
//               if (err) {
//                 console.log(loop.iteration(), 'Turnout was skipped.', err);
//                 skippedIndices.push({ 
//                                       error: err
//                                     });
//                 if(i < iterations){
//                   i++;
//                   loop.next();
//                 } else { loop.next(); }

//                 } else {
//                   if(i < iterations){
//                     i++;
//                     console.log(loop.iteration(),'Turnout has been saved');  
//                     loop.next();
//                     }
//                   }                    
//                 });
//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );


//////////////////////////// Upload Leadership PAC Data

  var LDR_PAC_Sponsor = require('./data/db/LDR_PAC_Sponsor.model');
//   var skippedIndices = [];
//       cleanData = mixedDataCleaner(JSONdata);

//   var iterations = cleanData.length;
//   var i = 0;
//   asyncLoop(iterations, function(loop) {
//   console.log(loop.iteration(), cleanData[i].com_nam)

//   var sponsor = new LDR_PAC_Sponsor();
//       sponsor.com_id = cleanData[i].com_id,
//       sponsor.com_nam = cleanData[i].com_nam,
//       sponsor.lin_ima = cleanData[i].lin_ima,
//       sponsor.spo_nam = cleanData[i].spo_nam,
//       sponsor.aff_com_nam = cleanData[i].aff_com_nam,
//       sponsor.tot_rec = cleanData[i].tot_rec,
//       sponsor.cas_on_han = cleanData[i].cas_on_han,
//       sponsor.cov_end_dat = cleanData[i].cov_end_dat
      

       
        
//       sponsor.save(function (err, success) {
//               if (err) {
//                 console.log(loop.iteration(), 'sponsor was skipped.', err);
//                 skippedIndices.push({ 
//                                       error: err
//                                     });
//                 if(i < iterations){
//                   i++;
//                   loop.next();
//                 } else { loop.next(); }

//                 } else {
//                   if(i < iterations){
//                     i++;
//                     console.log(loop.iteration(),'sponsor has been saved');  
//                     loop.next();
//                     }
//                   }                    
//                 });
//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );


//////////////////////////// Upload Administrative Fines Data

  var Administrative_Fine = require('./data/db/Administrative_Fine.model');
//   var skippedIndices = [];
//       cleanData = mixedDataCleaner(JSONdata);

//   var iterations = cleanData.length;
//   var i = 0;
//   asyncLoop(iterations, function(loop) {
//   console.log(loop.iteration(), cleanData[i].com_nam)

//   var fine = new Administrative_Fine();
//     fine.cas_num = cleanData[i].cas_num;
//     fine.com_id = cleanData[i].com_id;
//     fine.com_nam = cleanData[i].com_nam;
//     fine.rep_typ = cleanData[i].rep_typ;
//     fine.rep_yea = cleanData[i].rep_yea;
//     fine.fin_amo = cleanData[i].fin_amo;
//     fine.off = cleanData[i].off;
//     fine.sta = cleanData[i].sta;
//     fine.dis = cleanData[i].dis;
//     fine.can_nam = cleanData[i].can_nam;
//     fine.lat_fil_not_fil = cleanData[i].lat_fil_not_fil;
//     fine.pai_yes_no = cleanData[i].pai_yes_no
       
        
//       fine.save(function (err, success) {
//               if (err) {
//                 console.log(loop.iteration(), 'fine was skipped.', err);
//                 skippedIndices.push({ 
//                                       index: i,
//                                       error: err
//                                     });
//                 if(i < iterations){
//                   i++;
//                   loop.next();
//                 } else { loop.next(); }

//                 } else {
//                   if(i < iterations){
//                     i++;
//                     console.log(loop.iteration(),'fine has been saved');  
//                     loop.next();
//                     }
//                   }                    
//                 });
//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );

// fine.find({ name: })



//////////////////////////// Upload CommitteeSummary


  var Committee_Summary = require('./data/db/Committee_Summary.model');
//   var skippedIndices = [];
//       cleanData = mixedDataCleaner(JSONdata);

//   var iterations = cleanData.length;
//   var i = 0;
//   asyncLoop(iterations, function(loop) {
//   console.log(loop.iteration(), cleanData[i].com_nam)

//   var committeeSummary = new Committee_Summary();
//     committeeSummary.com_nam = cleanData[i].com_nam;
//     committeeSummary.lin_ima = cleanData[i].lin_ima;
//     committeeSummary.com_typ = cleanData[i].com_typ;
//     committeeSummary.com_des = cleanData[i].com_des;
//     committeeSummary.fil_fre = cleanData[i].fil_fre;
//     committeeSummary.add = cleanData[i].add;
//     committeeSummary.cit = cleanData[i].cit;
//     committeeSummary.sta = cleanData[i].sta;
//     committeeSummary.zip = cleanData[i].zip;
//     committeeSummary.tre_nam = cleanData[i].tre_nam;
//     committeeSummary.com_id = cleanData[i].com_id;
//     committeeSummary.fec_ele_yea = cleanData[i].fec_ele_yea;
//     committeeSummary.ind_ite_con = cleanData[i].ind_ite_con;
//     committeeSummary.ind_uni_con = cleanData[i].ind_uni_con;
//     committeeSummary.ind_con = cleanData[i].ind_con;
//     committeeSummary.ind_ref = cleanData[i].ind_ref;
//     committeeSummary.par_com_con = cleanData[i].par_com_con;
//     committeeSummary.oth_com_con = cleanData[i].oth_com_con;
//     committeeSummary.oth_com_ref = cleanData[i].oth_com_ref;
//     committeeSummary.can_con = cleanData[i].can_con;
//     committeeSummary.tot_con = cleanData[i].tot_con;
//     committeeSummary.tot_con_ref = cleanData[i].tot_con_ref;
//     committeeSummary.can_loa = cleanData[i].can_loa;
//     committeeSummary.oth_loa = cleanData[i].oth_loa;
//     committeeSummary.oth_loa_rep = cleanData[i].oth_loa_rep;
//     committeeSummary.tot_loa = cleanData[i].tot_loa;
//     committeeSummary.tot_loa_rep = cleanData[i].tot_loa_rep;
//     committeeSummary.tra_fro_oth_aut_com = cleanData[i].tra_fro_oth_aut_com;
//     committeeSummary.tra_fro_non_fed_acc = cleanData[i].tra_fro_non_fed_acc;
//     committeeSummary.tra_fro_non_fed_lev_acc = cleanData[i].tra_fro_non_fed_lev_acc;
//     committeeSummary.tot_non_fed_tra = cleanData[i].tot_non_fed_tra;
//     committeeSummary.oth_rec = cleanData[i].oth_rec;
//     committeeSummary.tot_rec = cleanData[i].tot_rec;
//     committeeSummary.tot_fed_rec = cleanData[i].tot_fed_rec;
//     committeeSummary.ope_exp = cleanData[i].ope_exp;
//     committeeSummary.sha_fed_ope_exp = cleanData[i].sha_fed_ope_exp;
//     committeeSummary.sha_non_fed_ope_exp = cleanData[i].sha_non_fed_ope_exp;
//     committeeSummary.tot_ope_exp = cleanData[i].tot_ope_exp;
//     committeeSummary.off_to_ope_exp = cleanData[i].off_to_ope_exp;
//     committeeSummary.fed_sha_of_joi_act = cleanData[i].fed_sha_of_joi_act;
//     committeeSummary.non_fed_sha_of_joi_act = cleanData[i].non_fed_sha_of_joi_act;
//     committeeSummary.non_all_fed_ele_act_par = cleanData[i].non_all_fed_ele_act_par;
//     committeeSummary.tot_fed_ele_act = cleanData[i].tot_fed_ele_act;
//     committeeSummary.fed_can_com_con = cleanData[i].fed_can_com_con;
//     committeeSummary.fed_can_con_ref = cleanData[i].fed_can_con_ref;
//     committeeSummary.ind_exp_mad = cleanData[i].ind_exp_mad;
//     committeeSummary.coo_exp_par = cleanData[i].coo_exp_par;
//     committeeSummary.loa_mad = cleanData[i].loa_mad;
//     committeeSummary.loa_rep_rec = cleanData[i].loa_rep_rec;
//     committeeSummary.tra_to_oth_aut_com = cleanData[i].tra_fro_oth_aut_com;
//     committeeSummary.fun_dis = cleanData[i].fun_dis;
//     committeeSummary.off_to_fun_exp_pre = cleanData[i].off_to_fun_exp_pre;
//     committeeSummary.exe_leg_acc_dis = cleanData[i].exe_leg_acc_dis;
//     committeeSummary.off_to_leg_acc_exp_pre = cleanData[i].off_to_leg_acc_exp_pre;
//     committeeSummary.tot_off_to_ope_exp = cleanData[i].tot_off_to_ope_exp;
//     committeeSummary.oth_dis = cleanData[i].oth_dis;
//     committeeSummary.tot_fed_dis = cleanData[i].tot_fed_dis;
//     committeeSummary.tot_dis = cleanData[i].tot_dis;
//     committeeSummary.net_con = cleanData[i].net_con;
//     committeeSummary.net_ope_exp = cleanData[i].net_ope_exp;
//     committeeSummary.cas_on_han_beg_of_per = cleanData[i].cas_on_han_beg_of_per;
//     committeeSummary.cas_on_han_clo_of_per = cleanData[i].cas_on_han_clo_of_per;
//     committeeSummary.deb_owe_by_com = cleanData[i].deb_owe_by_com;
//     committeeSummary.deb_owe_to_com = cleanData[i].deb_owe_to_com;
//     committeeSummary.cov_sta_dat = cleanData[i].cov_sta_dat;
//     committeeSummary.cov_end_dat = cleanData[i].cov_end_dat;
//     committeeSummary.pol_par_com_ref = cleanData[i].pol_par_com_ref;
//     committeeSummary.can_id = cleanData[i].can_id;
//     committeeSummary.cas_on_han_beg_of_yea = cleanData[i].cas_on_han_beg_of_yea;
//     committeeSummary.cas_on_han_clo_of_yea = cleanData[i].cas_on_han_clo_of_yea;
//     committeeSummary.exp_sub_to_lim_pri_yea_pre = cleanData[i].exp_sub_to_lim_pri_yea_pre;
//     committeeSummary.exp_sub_lim = cleanData[i].exp_sub_lim;
//     committeeSummary.fed_fun = cleanData[i].fed_fun;
//     committeeSummary.ite_con_exp_con_com = cleanData[i].ite_con_exp_con_com;
//     committeeSummary.ite_oth_dis = cleanData[i].ite_oth_dis;
//     committeeSummary.ite_oth_inc = cleanData[i].ite_oth_inc;
//     committeeSummary.ite_oth_ref_or_reb = cleanData[i].ite_oth_ref_or_reb;
//     committeeSummary.ite_ref_or_reb = cleanData[i].ite_ref_or_reb;
//     committeeSummary.oth_fed_ope_exp = cleanData[i].oth_fed_ope_exp;
//     committeeSummary.sub_con_exp = cleanData[i].sub_con_exp;
//     committeeSummary.sub_oth_ref_or_reb = cleanData[i].sub_oth_ref_or_reb;
//     committeeSummary.sub_ref_or_reb = cleanData[i].sub_ref_or_reb;
//     committeeSummary.tot_com_cos = cleanData[i].tot_com_cos;
//     committeeSummary.tot_exp_sub_to_lim_pre = cleanData[i].tot_exp_sub_to_lim_pre;
//     committeeSummary.uni_con_exp = cleanData[i].uni_con_exp;
//     committeeSummary.uni_oth_dis = cleanData[i].uni_oth_dis;
//     committeeSummary.uni_oth_inc = cleanData[i].uni_oth_inc;
//     committeeSummary.uni_oth_ref_or_reb = cleanData[i].uni_oth_ref_or_reb;
//     committeeSummary.uni_ref_or_reb = cleanData[i].uni_ref_or_reb;
//     committeeSummary.org_tp = cleanData[i].org_tp;

        
//       committeeSummary.save(function (err, success) {
//               if (err) {
//                 console.log(loop.iteration(), 'Committee_Summary was skipped.', err);
//                 skippedIndices.push({ 
//                                       index: i,
//                                       error: err
//                                     });
//                 if(i < iterations){
//                   i++;
//                   loop.next();
//                 } else { loop.next(); }

//                 } else {
//                   if(i < iterations){
//                     i++;
//                     console.log(loop.iteration(),'Committee_Summary has been saved');  
//                     loop.next();
//                     }
//                   }                    
//                 });
//   },
//     function(){
//       console.log('Data has finished uploading. The following indices were skipped:', skippedIndices)}
// );





//   ////////////////////////////





var publicPath = path.resolve(__dirname, 'public');
var districts = require(__dirname, '/districts.js')
var fetch = require('isomorphic-fetch')
var polyfill = require('babel-polyfill')
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3500;
var Zipcode = require('./data/db/Zipcode.model.js')

var zipcodes = require('./data/old_Data/zipcodes.js')
var contributions = require('./data/old_Data/contribution_data2016.js')


var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// var urlParser = bodyParser.urlencoded({ extended: false });
// parse application/json
app.use(bodyParser.json());
// var jsonParser = bodyParser.json();


app.use(express.static(publicPath));

//route to return the representative for the district based on the zipcode lookup
app.get('/api/representatives/:zipcode', function(req, res) {
  var zipcode = req.params.zipcode
  var district = zipcodes[zipcode]['district']
  var state = zipcodes[zipcode]['state']
  var image;

  //govtrack api returns the representative information based on our query
  fetch('https://www.govtrack.us/api/v2/role?current=true&district=' + district + '&state=' + state)
    .then(function(rep) {
       return rep.json()
      }).then(function(val) {
        return val
       }).then(function(congressperson) {
          fetch('https://www.govtrack.us/api/v2/role?current=true&role_type=senator&state=CA')
              .then(function(img) {
                return img.json()
              })
              .then(function(senator) {
                senator.objects.push(congressperson.objects[0])
                res.send(senator)
              })
        })
  });

app.get('/representatives/:id', function(req, res) {
  res.sendFile(publicPath + '/index.html');
})

app.get('/representatives', function(req, res) {
  res.sendFile(publicPath + '/index.html')
})

//if we're not in production, this proxies requests to localhost:3000 and sends them to our webpack server at localhost:8080
if (!isProduction) {
  var bundle = require('./server/compiler.js');
  bundle();
  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

/////////////////////////////////////////// API helper functions
var queryName = function(string){
  var results = string.toUpperCase();
  console.log('this is results#1', results);
  var results2 = [];
    // "PETE AGUILAR"
  results = results.split(' ');
  console.log('this is results#2');
  results2.push(results[1], results[0]);
  console.log('results2 #1');
  results2 = results2.join(', ');
  return results2;
};

var User = require('./data/db/User.model');

  app.post('/api/signup', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      console.log(req.params)
      return res.status(400).json({ message: 'Please fill out all fields' });
    }
    // console.log('***************', Object.keys(req));
  var user = new User();
    user.password = req.body.password
    user.username = req.body.username
  console.log('this is the user', user)

    user.save(function (err, success) {
      if (err) {
        return next(err);
      }
      return res.json({
        'theSmellOfSuccess': true
      });
    });      
  });

app.get('/api/data/CandidateSummary/:rep1/:role1/:rep2/:role2/:rep3/:role3j/:state', function(req, res) {
  //console.log(req.params)
})

app.get('/api/data/CandidateSummary', function(req, res, next) {

  var data = CandidateSummary.find({})
  .exec( function(err, data){
    if(err){
      res.send('an error occured fetching your data :(')
    } else {
      res.json(data)
    }
  })

})