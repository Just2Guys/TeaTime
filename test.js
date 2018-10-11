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
const io = require ("socket.io")(httpServer, {
	origins: "http://localhost:4200"
});

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
	req.session.pass = "ff07c3d600987d425bcc03f6ea9ead6b";
	next ();
});

server.use ('/user', user.router);
server.use ('/admin', admin);
server.use ('/stock', stock);
server.use ('/driver', driver.router);

driver.emitter.on ("deleteOrder", id => {
	io.emit ("driverDeleteOrder", id);
});

user.emitter.on ("newOrder", order => {
	io.emit ("driverNewOrder", order);
});

app.on ("ready", () => {
	httpServer.listen (config.port);
	console.log ("server listened on port:", config.port);
	app.checkExpireTimeProducts ();
});
