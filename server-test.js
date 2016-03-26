var express = require('express');
var path = require('path');
var fs = require('fs')
var Xray = require('x-ray');
var x = Xray();
var port = 4500;
var app = express();

//app.use(express.static(districts));

app.listen(port, function () {
  console.log('Server running on port ' + port);
});


//****************UNCOMMENT FOR DISTRICT / ZIPCODE RELATION DATA**********************//
fs.readFile('./natl_zccd_delim.txt', 'utf-8', function(err, data) {
	var hello = data.replace('\r', '')
	var goodbye = hello.split('\n')
	var storage = [];
	for (var i = 0; i < goodbye.length; i++) {
		var temp = goodbye[i].split(',')
		var obj = {
			district: temp[0],
			zipcode: temp[1]
		}
		storage.push(obj)
	}
	fs.writeFile('./districts.js', storage, (err) => {
  if (err) throw err;
  console.log('It\'s saved!');
	});
})