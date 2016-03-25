var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');
var publicPath = path.resolve(__dirname, 'public');
var Xray = require('x-ray');
var x = Xray();
var publicPath = path.resolve(__dirname, 'public');
// We need to add a configuration to our proxy server,
// as we are now proxying outside localhost
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

var db = 'mongodb://codeblackwell:Database21@ds035310.mlab.com:35310/heroku_hkr86p3z';

mongoose.connect(db)


var proxy = httpProxy.createProxyServer({
  changeOrigin: true
});

var app = express();

app.use(express.static(publicPath));

// If you only want this for development, you would of course
// put it in the "if" block below

app.get('/api/representative/:zipcode', function(req, res) {
  x('https://www.census.gov/geo/maps-data/data/cd_state.html', 'select').write().pipe(res)
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
