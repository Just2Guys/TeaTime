const router = require ("express").Router ();
const multer = require ("multer");

const storage = multer.diskStorage ({
	destination: (req, file, cb) => {
		cb (null, "photos");
	},

	filename: async (req, file, cb) => {
		let files = await directory.read ();
		let filename = files.length == 0 ? 1 : Number (files [files.length - 1].split (".jpg")[0]) + 1;
		cb (null, filename + ".jpg");
	}
});

const multerSetting = multer ({storage: storage});

const Users = require ('../models/user');
const Products = require ('../models/product');
const Dishes = require ('../models/menu');
const Cars = require ("../models/car");
const Menu = require ("../models/menu");

const roleChecker = require ("../components/role_checker");
const directory = require ("../components/read_directory");

router.use (async (req, res, next) => {

	if (!req.session.pass) {
		res.json (false);
		return false;
	} 

	await roleChecker (2, req.session.pass) == true ? next () : res.json (false);
});


router.get ('/cars', (req, res) => {
	Cars.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

router.get ('/users', (req, res) => {
	Users.find ({role: {$lt: 2}}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

router.post ('/removeFromMenu', async (req, res) => {
	let dish = await Dishes.findOne ({_id: req.body.id});
	directory.delete (dish.image);
	Dishes.deleteOne ({_id: req.body.id}).exec ();
});

router.get ('/menu', (req, res) => {
	Menu.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

router.post ('/upload', multerSetting.single ("photo"), async (req, res) => {
	res.json (true);
});

router.post ('/addInMenu', async (req, res) => {
	let dishes = await Dishes.find ();

	let lastDish = dishes.length == 0 ? 1 : dishes [dishes.length - 1].image + 1;

	let images = await directory.read ();
	let dish = new Dishes ();
	dish.title = req.body.title;
	dish.image = lastDish;
	dish.description = req.body.description;
	dish.recipe = req.body.recipe;
	dish.price = req.body.price;	
	dish.save ();
	res.json (true); 
});

router.post ('/addProduct', (req, res) => {
	timeProduct = new Date (); // time when product will be expired 
	expireTime = req.body.expire [0] * 3600 + req.body.expire [1] * 60 + req.body.expire [2]// time to live from client 
	let product = new Products ();
	product.name = req.body.name;
	product.value = req.body.value;
	product.expire = timeProduct.setSeconds (timeProduct.getSeconds () + expireTime) // array[hh, mm, ss];
	product.save ();
	res.json (expireTime);
});

router.post ('/setRole', async (req, res) => {
	let user = await Users.findOne ({_id: req.body.id});

	if (!user) {
		res.json (false);
		return false;
	} 

	Users.updateOne ({_id: req.body.id}, {role: req.body.role}).exec ();
	res.json (true);
});

module.exports = router;