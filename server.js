var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var fs = require('fs');
var Promise = require("bluebird");
var pFs = Promise.promisifyAll(require('fs'));

//connect to local host
//var db = 'mongodb://localhost/Contributors';

//connect to heroku
var db = 'mongodb://codeblackwell:Database21@ds035310.mlab.com:35310/heroku_hkr86p3z';

mongoose.connect(db)

////////////////////////////Models
var Contributor = require('./data/db/Contributor.model.js');

//THIS IS THE DATA CONVERSION MACHINE!!!!!!!!!
////////////////////////////

//INSERT YOUR CSV DATA HERE!
var csvFile = "./data/voter_Turnout/primary/2000+2004_PEVT.csv";
//DESIRED OUTPUT DIRECTORY!
var output = "./data/2000+2004_PEVT.json";
//START SERVER AND WAIT FOR MAGIC!

//Converter Class
var Converter  = require('csvtojson').Converter;
var converter  = new Converter({});
converter.fromFile(csvFile, function(err, result) {
   console.log(result);
  pFs.writeFile(output, JSON.stringify(result), function(err) {
     if(err) throw err;
   })
});

//var JSONdata = pFs.readFileSync(output);
//    JSONdata = JSON.parse(JSONdata.toString())
    //console.log(JSONdata) => csv in JSON.

////////////////////////////
//Time To Upload data to Mongolab
///////////////////////////

// var contributorController = require('./data/db/controllers/contributorController.js');
//
//
// contributorController.createContributor(JSONdata[0]);
//   // for(var i = 0; i < JSONdata.length; i++) {
//   //   contributorController.createContributor(JSONdata[i]);
//   // }

////////////////////////////


var publicPath = path.resolve(__dirname, 'public');
var Xray = require('x-ray');
var x = Xray();
var publicPath = path.resolve(__dirname, 'public');
var districts = require(__dirname, '/districts.js')
var fetch = require('isomorphic-fetch')
var polyfill = require('babel-polyfill')
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3500;


var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var router = express.Router()

app.use(express.static(publicPath));

// If you only want this for development, you would of course
// put it in the "if" block below
var obj;
fs.readFile('./reps.js', 'utf-8', function(err, data) {
  if (err) throw err;
  obj = data
})

app.get('/api/representative/:zipcode', function(req, res) {
  var zipcode = req.params.zipcode
  var hello = JSON.parse(obj)
  var district = hello[zipcode]['district']
  var state = hello[zipcode]['state']
  var image;
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
