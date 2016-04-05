var express = require('express');
var path = require('path');
var fs = require('fs')
var Xray = require('x-ray');
var PDFParser = require('./node_modules/pdf2json/PDFParser');
var x = Xray();
var port = 4500;
var app = express();
var pdfParser = new PDFParser();

//app.use(express.static(districts));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});

//console.log(pdfParser)
// pdfParser.on('dfParser_dataError', function(errData) {
// 	console.error(errData.parserError)
// })
// pdfParser.on('dfParser_dataReady', function(pdfData) {
// 	console.log(pdfData)
//     fs.writeFile('/data/voter_turnout/California/participation.json', JSON.stringify(pdfData), (err) => {
//     	if (err) throw err;
//     	console.log('It\'s saved!')
//     });
// });
// var arr = []
// fs.readFile('./data/voter_Turnout/California/ca.txt', 'utf-8', function(err, data) {
//   var hello = data.split('\n')
//   console.log(hello)
// })


//****************UNCOMMENT FOR DISTRICT / ZIPCODE RELATION DATA**********************//
// // fs.readFile('./natl_zccd_delim.txt', 'utf-8', function(err, data) {
// // 	var hello = data.replace(/[\r]*/g, '')
// // 	var goodbye = hello.split('\n')
// // 	var obj = {};
// // 	for (var i = 0; i < goodbye.length; i++) {
// // 		var temp = goodbye[i].split(',')
// // 		obj[temp[1]] = temp[2]
// // 	}
// // 	var stringed = JSON.stringify(obj)
// // 	fs.writeFile('./districts.js', stringed, (err) => {
// //   	if (err) throw err;
// //   	console.log('It\'s saved!');
// // 	});
// // })

//   	var newObj = {}
// fs.readFile('./zipcodes.js', 'utf-8', function(err, data) {
// 	//  var hello = data.replace(/[\r]*/g, '')
// 	//  var goodbye = hello.split('\n')
// 	// var obj = {};

// 	// var stringed = JSON.stringify(obj)
// 	//console.log(obj)
// 	 fs.readFile('./districts.js', 'utf-8', function(err, districts) {
//  //  	if (err) throw err;
//    	var yup = JSON.parse(districts)
//    	var hi = JSON.parse(data)
//   	console.log(yup['02921'])
//   	console.log(hi['02921'])
//   	for (var state in hi) {
//   		if (yup[state]) {
// 	  		newObj[state] = {
// 	  			district: yup[state],
// 	  			state: hi[state]
// 	  			}
//   		} else {
//   			console.log(state)
//   		}
//   	}
// 	var stringed = JSON.stringify(newObj)
// 	fs.writeFile('./reps.js', stringed, (err) => {
//   	if (err) throw err;
//   	console.log('It\'s saved!');
// 	});
// 	 })
// })

//THIS IS THE DATA CONVERSION MACHINE!!!!!!!!!
////////////////////////////

// //INSERT YOUR CSV DATA HERE!
// var csvFile = "./data/voter_Turnout/candidate_Summary.csv";
// //DESIRED OUTPUT DIRECTORY!
// var output = "./data/candidate_Summary";
// //START SERVER AND WAIT FOR MAGIC!

//Converter Class
// var Converter  = require('csvtojson').Converter;
// var converter  = new Converter({});
// converter.fromFile(csvFile, function(err, result) {
//    console.log(result);
//   pFs.writeFile(output, JSON.stringify(result), function(err) {
//      if(err) throw err;
//    })
// });

//var JSONdata = pFs.readFileSync(output);
//    JSONdata = JSON.parse(JSONdata.toString())
    //console.log(JSONdata) => csv in JSON.

// var JSONdata = fs.readFileSync('./data/candidate_Summary2016.js');
//     JSONdata = JSONdata.toString()
//     JSONdata = JSON.parse(JSONdata);
//     //console.log(JSONdata[53])
    


// var dataArray = [];
//     for(var i = 0; i < JSONdata.length; i++){
//       if(JSONdata[i].net_con !== 0){
//         var temp = {};
//         var hello = JSONdata[i].can_nam.split(',')
//         temp[hello[0]] = []
//         temp[hello[0]].push(JSONdata[i].ind_uni_con);
//         temp[hello[0]].push(JSONdata[i].ind_ite_con);
//         temp[hello[0]].push(JSONdata[i].par_com_con);
//         temp[hello[0]].push(JSONdata[i].oth_com_con);
//         temp[hello[0]].push(JSONdata[i].can_con);
//         temp[hello[0]].push(JSONdata[i].tot_con);
//         //temp.push(JSONdata[i].net_con);
//         dataArray.push(temp);        
//       }
//     }
//console.log(dataArray);


/*
* Parses array data for integers by removing '$' and ',' then using
* the Number() method to parse the integers. 
**/
// function cleanUpData (arrayOfObjects) {
  
//   function parseCurrency(aString){
//     var monk = aString.replace(/\$/g, ''),
//         kungfu = monk.replace(/\,/g, ''),
//         master = Number(kungfu);
//         return master;
//   }
  
//   for(var i = 0; i < arrayOfObjects.length; i++) {
//     for(var key in arrayOfObjects[i]) {
//       for(var q = 0; q < arrayOfObjects[i][key].length; q++) {
//         if(arrayOfObjects[i][key][q]){
//           arrayOfObjects[i][key][q] = parseCurrency(arrayOfObjects[i][key][q]);       
//         }
//       }
//     }
//    // console.log(arrayOfObjects[i][0])
//   }
//   return arrayOfObjects;
// }

// var cleanData = cleanUpData(dataArray);

//console.log(cleanData[30]);

// function generateLayers(arrayOfArrays) {
//   var layers = [];
//   for(var i = 0; i < arrayOfArrays.length; i++) {
//     for (var key in arrayOfArrays[i]) {
//       var candidate = {};
//       candidate[key] = [];
//         for(var q = 0; q < arrayOfArrays[i][key].length; q++) {
//           candidate[key].push({ x: q, y: arrayOfArrays[i][key][q] })
//         }
//         layers.push(candidate);
//     }
//   }
//   var yup = JSON.stringify(layers)
//   fs.writeFile('./contribution_data', yup, function(err, data) {
//     if (err) throw err;
//     console.log('it is saved my darling')
//   })
// }

// var generatedLayers = generateLayers(cleanData);

// var refinedData = [];

// var life = function (JSONdata) {
//   for(var i = 0; i < JSONdata.length; i++) {
//     if(JSONdata[i].net_con) {
//       var temp = {};
//       temp.can_nam = JSONdata[i].can_nam;
//       temp.can_off = JSONdata[i].can_off;
//       temp.can_off_sta = JSONdata[i].can_off_sta;
//       temp.can_par_aff = JSONdata[i].can_par_aff;
//       temp.can_cit = JSONdata[i].can_cit;
//       temp.can_sta = JSONdata[i].can_sta;
//       temp.ind_ite_con = JSONdata[i].ind_ite_con;
//       temp.ind_uni_con = JSONdata[i].ind_uni_con;
//       temp.par_com_con = JSONdata[i].par_com_con;
//       temp.oth_com_con = JSONdata[i].oth_com_con;
//       temp.net_con = JSONdata[i].net_con;
//       temp.cas_on_han_beg_of_per = JSONdata[i].cas_on_han_beg_of_per;
//       temp.cas_on_han_clo_of_per = JSONdata[i].cas_on_han_clo_of_per;
//       refinedData.push(temp);
//     }
//   }
// }
// life(JSONdata);
// console.log(refinedData);



//   ////////////////////////////
//   //Time To Upload data to Mongolab
//   ///////////////////////////

//   var contributorController = require('./data/db/controllers/contributorController.js');


//   contributorController.createContributor(JSONdata[0]);
//     // for(var i = 0; i < JSONdata.length; i++) {
//     //   contributorController.createContributor(JSONdata[i]);
//     // }

//   ////////////////////////////
 //})