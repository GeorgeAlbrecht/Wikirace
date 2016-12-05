var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var Client = require('node-rest-client').Client;
var https = require('https');
var fetch = require('node-fetch');
var fs = require('fs');

var client = new Client();

var app = express();

var signingUp = 0;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use((req, res, next) => {
	if (!req.cookies) {
		return next();
	}

	let gameId = req.cookies.gameId;
	if (gameId !== undefined) {
		// increment clicks
	}

	next();
});

app.get("/", (req, res) => {
	res.render('login');
})

app.post("/login", (req,res) => {
	if (signingUp) {
		res.render('sign_up');
	}
	else {
		res.render('login');
	}
});


app.post("/game", (req,res) => {
	console.log("in game POST call");
	console.log(req.body);
	signingUp = 0;
	_username = req.body.username;
	_password = req.body.password;
	if (_username === '' || _password === '') {
		res.render('error');
	}
	else {
		res.render('index');
	}
});

app.post("/sign-up", (req,res) => {
	// just a post to utilize a button to render another page
	console.log("in sign-up POST call");
	res.render('sign_up');
});

app.post("/signed-up", (req,res) => {
	console.log("in signed-up post call");
	console.log(req.body);
	signingUp = 1;
	_username = req.body.s_username;
	_password = req.body.s_password;
	//checking the database for username and password combo
	// if successful, return index
	// if failed, return error page with button back to login
	if (_username === '' || _password === '') {
		res.render('error');
	}
	else {
		client.get("https://wikirace.mybluemix.net/insertintoMongoDB/"+_username+"/"+_password, function(data, response){
			console.log(data);
			console.log(response);		
	    });
		res.render('login');
	}
});

app.post("/new-game", (req, res) => {
	res.render('newGame');
})

/*app.get("/race", (req, res) => {
	console.log(req.body);
	res.render('race', {
		_mode: req.body.game_mode,
		_start: req.body.start,
		_dest: req.body._dest
	});
});*/

app.post("/start-dest", (req, res) => {
	console.log("in start-dest POST call");
	console.log(req.body);

	res.render('startdest', {_mode: req.body.game_mode});
});

app.post("/race", (req, res) => {
	console.log("in race POST call");
	console.log(req.body);
	_mode = req.body._game_mode,
	_start = req.body.start,
	_dest = req.body.dest
	if (_mode === 'Timed') {
		res.render('timed', {
		_mode,
		_start,
		_dest
	});
	}
	else if (_mode === 'Clicks') {
		res.render('clicks', {
		_mode,
		_start,
		_dest
	});
	}
	
});

app.get("/wiki/:name", (req, res) => {
	console.log(req.params.name);

	res.status(200).send();
});

app.listen(3030, () => {
	console.log("Server running on 3030");
});