var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var fs = require('fs');
var Promise = require('bluebird');
var pFs = Promise.promisifyAll(require('fs'));
var bodyParser = require('body-parser');

var config = require('./config');

//connect to local host
//var db = 'mongodb://localhost/Contributors';

//connect to heroku
var db = config.dbURI;

mongoose.connect(db);

////////////////////////////Models
// var Contributor = require('./data/db/Contributor.model.js');

//THIS IS THE DATA CONVERSION MACHINE!!!!!!!!!
////////////////////////////

// //INSERT YOUR CSV DATA HERE!
var csvFile = "./data/General_Election_Turnout_1980-2014.csv";
// //DESIRED OUTPUT DIRECTORY!
var output = "./data/Gen_Election_Turnout_1980-2014.json";
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

// var JSONdata = fs.readFileSync("./data/candidate_Summary2016.js");
//     JSONdata = JSONdata.toString()
//     JSONdata = JSON.parse(JSONdata);
//     //console.log(JSONdata[53])
    


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


/*
* Parses array data for integers by removing '$' and ',' then using
* the Number() method to parse the integers. 
**/
// function cleanUpData (arrayOfArrays) {
  
//   function parseCurrency(aString){
//     var monk = aString.replace(/\$/g, ''),
//         kungfu = monk.replace(/\,/g, ''),
//         master = Number(kungfu);
//         return master;
//   }
  
//   for(var i = 0; i < arrayOfArrays.length; i++) {
//     for(var q = 0; q < arrayOfArrays[i].length; q++){
//       if(arrayOfArrays[i][q]){
//         arrayOfArrays[i][q] = parseCurrency(arrayOfArrays[i][q]);       
//       }
//     }
//   }
//   return arrayOfArrays;
// }

// var cleanData = cleanUpData(dataArray);

// //console.log(cleanData);

// function generateLayers(arrayOfArrays) {
//   var layers = [];
//   for(var i = 0; i < arrayOfArrays.length; i++) {
//     var candidate = [];
//     for(var q = 0; q < arrayOfArrays[i].length; q++) {
//       candidate.push({ x: q, y: arrayOfArrays[i][q] })
//     }
//     layers.push(candidate);
//   }
//   return layers;
// }

// var generatedLayers = generateLayers(cleanData);

//console.log(generatedLayers);

// module.exports.generatedLayers = generatedLayers;



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





var publicPath = path.resolve(__dirname, 'public');
var districts = require(__dirname, '/districts.js')
var fetch = require('isomorphic-fetch')
var polyfill = require('babel-polyfill')
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3500;
var Zipcode = require('./data/db/Zipcode.model.js')

var zipcodes = require('./data/zipcodes.js')
var contributions = require('./data/contribution_data.js')
console.log(contributions['LEE'])

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var router = express.Router();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// options
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  // console.log(Object.keys(req));
  console.log(req.params);

  res.end(JSON.stringify(req.body, null, 2))
})

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


//this route gets the contribution data based on last name
app.get('/api/representatives/:lastname', function(req, res) {

})

app.get('/profile', function(req, res) {
  res.sendFile(publicPath + '/index.html');
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



////////////////////////////////////////////////////////////



var userController = require('./data/db/controllers/userController');
var User = require('./data/db/User.model');

  app.post('/api/signup', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({message: 'Please fill out all fields'});
    }
    //console.log('***************', req);
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function (err, success) {
      if (err) {
        return next(err);
      }
      return res.json({
        userId: success._id
        // token: user.generateJWT()
      });
    });
  });









// var dbURI = 'mongodb://localhost/polis';

// mongoose.connect(dbURI);

// mongoose.connection.on( 'connected', function () {

//   console.log( 'successful db connection to: ' + dbURI + '\n' );

//   if (!isProduction ) {

//       Zipcode.remove().exec(); // clear database

//     pFs.readFileAsync('./reps.js', 'utf-8').then(function(zipcodes) {
//       var hello = [zipcodes]
//        Zipcode.collection.insertMany( hello, function( err, r ) {
//         if ( err ) {
//           console.log( 'error loading demo data:');
//         } else {
//           console.log( 'seeded database with records\n' );
//         };
//       })
//     })
//   }
// });

