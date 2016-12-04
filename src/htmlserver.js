var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();

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

app.post("/game", (req,res) => {
	console.log("in game POST call");
	console.log(req.body);
	//checking the database for username and password combo
	// if successful, return index
	// if failed, return error page with button back to login
	res.render('index');
});

app.post("/sign-up", (req,res) => {
	// just a post to utilize a button to render another page
	console.log("in sign-up POST call");
	res.render('sign_up');
});

app.post("/signed-up", (req,res) => {
	console.log("in signed-up post call");
	console.log(req.body);
	res.render('login');
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
	res.render('race', {
		_mode: req.body._game_mode,
		_start: req.body.start,
		_dest: req.body.dest
	});
});

app.get("/wiki/:name", (req, res) => {
	console.log(req.params.name);

	res.status(200).send();
});

app.listen(3030, () => {
	console.log("Server running on 3030");
});