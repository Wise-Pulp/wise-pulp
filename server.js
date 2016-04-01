var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var fs = require('fs');
var Promise = require('bluebird');
var pFs = Promise.promisifyAll(require('fs'));
var publicPath = path.resolve(__dirname, 'public');
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
console.log(contributions['ADAMS'])
console.log(contributions['RYAN'])

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var router = express.Router()

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

