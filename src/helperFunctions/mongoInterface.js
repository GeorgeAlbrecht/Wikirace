var mongo = require('mongodb');
var path = require("path");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 9000, {auto_reconnect: true});
db = new Db('Wikirace', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to database");
        db.collection('Wikirace', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'wines' collection doesn't exist");
            }
	    else{
		console.log("There was no error");
	    }
        });
    }
});

exports.findAll = function(req, res) {
    db.collection('Wikirace', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};

exports.findByIdName = function(req, res) {
    res.send({id: req.params.id, name: req.params.name, description: "description"});
};

