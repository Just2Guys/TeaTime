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
const httpServer = require ("http").createServer (server);
const io = require ("socket.io")(httpServer);

io.on ("connection", socket => {
	socket.on("init", () => console.log("user connected"));
});

io.on ("error", error => console.log (error));

app.updateCarsCords (io);

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

server.use (session ({secret: "omg test profile of this man!!!", resave: false, saveUninitialized: true, cookie: {maxAge: 60 * 60 * 1000}}));
server.use (cookieParser ());
server.use (bodyParser.json ());
server.use ('/assets', express.static (__dirname + "/photos"));

server.use ((req, res, next) => {
	req.session.test = "14f6d85af3427dff65d28c282cd9be05";
	next ();
});

server.use ('/user', user);
server.use ('/admin', admin);
server.use ('/stock', stock);
server.use ('/driver', driver.router);

httpServer.listen (config.port);

app.on ("ready", () => {
	console.log ("server listened on port:", config.port);
	app.checkExpireTimeProducts ();
});
