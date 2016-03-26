var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var publicPath = path.resolve(__dirname, 'public');
var fs = require('fs');
var Xray = require('x-ray');
var x = Xray();
var publicPath = path.resolve(__dirname, 'public');
var districts = require(__dirname, '/districts.js')
var fetch = require('isomorphic-fetch')
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3500;

var db = 'mongodb://codeblackwell:Database21@ds035310.mlab.com:35310/heroku_hkr86p3z';

mongoose.connect(db)

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

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

  //fuck this, just create a table with all of their img URLs, title, district, name, party, birthday(?wish your congressperson a happy birthday?)
  fetch('https://www.govtrack.us/api/v2/role?district=' + district + '&state=' + state)
    .then(function(rep) {
      //console.log(rep)
      var myObject = {
        congressPerson: rep
      } 
      fetch('https://www.govtrack.us/api/v2/role?current=true&role_type=senator&state=CA')
          .then(function(img) {
          myObject['senators'] = img
          res.send(myObject)
        })
    })
})

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

app.post('/', function(req, res) {
  
  res.send('Successfully posted to Database')
})
