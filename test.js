const App = require ("./app");
const config = require ("./config");
const express = require ("express");
const bodyParser = require ("body-parser");
const session = require ("express-session");
const cookieParser = require ("cookie-parser");

let app = new App (config);

//routes
const admin = require ("./routes/admin");
const user = require ('./routes/user');

app.on ("error", () => {
	console.log ("ERROR: App crashed due to code problem!");
	process.exit ();
});

const server = express ();

server.use (session ({secret: "omg test profile of this man!!!", resave: false, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 1000}}));
server.use (cookieParser ());
server.use (bodyParser.json ());

server.use ((req, res, next) => {
	req.session.pass = "558db79d2508ece60676e86305bc54b0";
	next ();
});

server.use ('/user', user);
server.use ('/admin', admin);


app.on ("ready", () => {
	server.listen (config.port);
	console.log ("server listened on port:", config.port);
	app.checkExpireTimeProducts ();
});
