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
const stock = require ("./routes/stock");
const driver = require ("./routes/driver");

app.on ("error", () => {
	console.log ("ERROR: App crashed due to code problem!");
	process.exit ();
});

const server = express ();

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.clientUrl);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

server.use (session ({secret: "omg test profile of this man!!!", resave: false, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 1000}}));
server.use (cookieParser ());
server.use (bodyParser.json ());

server.use ('/user', user);
server.use ('/admin', admin);
server.use ('/stock', stock);
server.use ('/driver', driver.router);


app.on ("ready", () => {
	server.listen (config.port);
	console.log ("server listened on port:", config.port);
	app.checkExpireTimeProducts ();
});
