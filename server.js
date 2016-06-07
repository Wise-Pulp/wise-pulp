var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var Promise = require('bluebird');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var router = require('./router');
var publicPath = path.resolve(__dirname, 'public');

var config = require('./config');
var cleanData;


/// @TODO: assign bodybarsers to variables and only execute on necessary routes
app.use(bodyParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

router(app);
//connect to heroku
var db = config.dbURI2;

mongoose.connect(db);


//THIS IS THE DATA CONVERSION MACHINE!!!!!!!!!
////////////////////////////

// //INSERT YOUR CSV DATA HERE!
var csvFile = './data/districts.csv';
// //DESIRED OUTPUT DIRECTORY!
var output = './data/GeoJson/USCounties_500k.json';
// //START SERVER AND WAIT FOR MAGIC!


//Converter Class
var Converter = require('csvtojson').Converter;
var converter = new Converter({});

var JSONdata = fs.readFileSync(output);
JSONdata = JSON.parse(JSONdata.toString());

/////////////////////////////////
/////// Functions to help with the data processing
/////// and upload process.
////////////////////////////////


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

function fixCandidateDates(BadlyFormattedDate) {
  var regEx = BadlyFormattedDate.replace(/\-/g, '++');
  // console.log('this is regex', regEx);
    regEx = regEx.replace(/\//g, '++')
  // console.log('this is regex2', regEx);

  var storage = [];
  var results = '';
  for(var i = 2; i >= 0; i--) {
    var temp = regEx.split('++');
    storage.push(temp[i]);
    // console.log(storage);
  } 
  results = storage[1] + '-' + storage[0] + '-' + storage[2];
  console.log('results from fixCandidateDates', results)
  return results;
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


var Xray = require('x-ray');
var xray = Xray();
var publicPath = path.resolve(__dirname, 'public');
var districts = require(__dirname, '/districts.js');
var fetch = require('isomorphic-fetch');
var polyfill = require('babel-polyfill');

// var zipcodes = require('./data/old_Data/zipcodes.js');



/****************************************************
      collects bill information from govtrack
****************************************************/

function collectBills(uri, model) {
  fetch(uri, (req, res) => {
  }).then(res => {
    //console.log('*********************\n\n\n\n\response from housebills \n\n\n\n\n\n********************', res.json());
    return res.json();
  }).then( function(houseBill){
    
    var i = 0;
    var iterations = houseBill.objects.length;
    var skippedBills = [];

    asyncLoop(iterations, function(loop) {
      console.log('loop.iteration()', loop.iteration());
      const bill = new model();
      bill.billNumber = houseBill.objects[i].display_number;
      bill.billName = houseBill.objects[i].title_without_number;
      bill.fullTextLink = houseBill.objects[i].thomas_link;
      bill.terms = houseBill.objects[i].terms;
      bill.statusDescription = houseBill.objects[i].current_status_label;
      bill.sponsor = houseBill.objects[i].sponsor.name;

      bill.save(function(err, success) {
        if (err) {
          console.warn(loop.iteration(), ' bill data was skipped! ', err);
          skippedBills.push({
            index: i,
            error: err
          });
          if (i < iterations) {
            i++;
            loop.next();
          } else {
            loop.next();
          }
        } else {
          if (i < iterations) {
            i++;
            console.log('iteration ', loop.iteration(), ' bill has been saved');
            loop.next();
          }
        }
      })
    },
    function() {
      console.log('Bills have finished uploading. The following bills were skipped', skippedBills);
    });
  });
}









