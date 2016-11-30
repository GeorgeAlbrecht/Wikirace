var express = require('express');
var mongoInterface = require('./helperFunctions/mongoInterface');

var app = express();

app.get('/players', mongoInterface.findAll);
app.get('/players/:id', mongoInterface.findById);
app.get('/players/:id/:name', mongoInterface.findByIdName);

app.listen(3000);
console.log('Listening on port 3000...');