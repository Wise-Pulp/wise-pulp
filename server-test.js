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
	var hello = data.replace(/[\r]*/g, '')
	var goodbye = hello.split('\n')
	var obj = {};
	for (var i = 0; i < goodbye.length; i++) {
		var temp = goodbye[i].split(',')
		obj[temp[1]] = temp[2]
	}
	var stringed = JSON.stringify(obj)
	fs.writeFile('./districts.js', stringed, (err) => {
  	if (err) throw err;
  	console.log('It\'s saved!');
	});
})