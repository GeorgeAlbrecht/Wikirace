/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var port = 9000;
var https = require("https");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.get("/wiki/:path", function(req, res){
	var options = {
		host: 'en.wikipedia.org',
		path: '/wiki/'+req.params.path,
	  	method: 'GET'
	};

	var html = '';

	var request = https.request(options, function(result) { 
	  result.setEncoding('utf8');
	  result.on('data', function (chunk) {
	    	html += chunk;
	  });
	  result.on('end', function(chunk){
	  		res.send(html);
	  });
	});

	request.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	request.write('data\n');
	request.write('data\n');
	request.end();
});

// get the app environment from Cloud Foundry

// start server on the specified port and binding host
app.listen(port, '127.0.0.1', function() {
  // print a message when the server starts listening
  console.log("server starting on " + port);
});
