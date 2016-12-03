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
	res.render('index');
})

app.post("/new-game", (req, res) => {
	res.render('newGame');
})

app.post("/start-dest", (req, res) => {
	console.log(req.body);

	res.render('startdest');
});

app.post("/race", (req, res) => {
	console.log(req.body);
	res.render('race');
});

app.get("/wiki/:name", (req, res) => {
	console.log(req.params.name);

	res.status(200).send();
});

app.listen(3030, () => {
	console.log("Server running on 3030");
});