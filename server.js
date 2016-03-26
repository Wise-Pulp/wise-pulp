var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var fs = require('file-system');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});


var db = 'mongodb://localhost/Contributors';
mongoose.connect(db)

////////////////////////////Models
var Contributor = require('./data/db/Contributor.model.js');


////////////////////////////

//Converter Class
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

converter.fromFile("./data/independent-expenditure.csv", function(err, result) {
    console.log(result)
});

////////////////////////////

var publicPath = path.resolve(__dirname, 'public');
// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();
var router = express.Router()

app.use(express.static(publicPath));

// If you only want this for development, you would of course
// put it in the "if" block below

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

app.get('/NASDAQ', function(req, res) {
    var data = NASDAQ_week.find({})
    .exec(function(err, data) {
      if(err){
        res.send('an error has occured with NASDAQ json');
      } else {
        res.json(data);
      }
    })
  })
