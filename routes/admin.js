const router = require ("express").Router ();

const Users = require ('../models/user');
const Products = require ('../models/product');
const Dishes = require ('../models/menu');

router.use ((req, res, next) => {
	if (!req.session.pass) {
		res.json ("you aren't admin");
		return false;
	} 

	Users.findOne ({password:req.session.pass}, (err, data) => {

		if (err || !data) {
			res.json ("you aren't admin");
		} else if (data.role < 3) {
			res.json ("you aren't admin");	
		} else {
			next ();
		}
	});
});

router.get ('/users', (req, res) => {
	Users.find ({}, (err, data) => {
		if (err) {
			console.log (err);
		} else {
			res.json (data);
		}
	});
});

router.get ('/products', (req, res) => {
	Products.find ({}, (err, data) => {
		if (err) {
			console.log (err);
		} else {
			res.json (data);
		}
	});
});

router.post ('/addInMenu', (req, res) => {
	let dish = new Dishes ();
	dish.title = req.body.title;
	dish.image = req.body.image;
	dish.description = req.body.description;
	dish.recipe = req.body.recipe;
	dish.price = req.body.price;	
	dish.save ();
	res.json (true); 
});

router.post ('/removeFromMenu', (req, res) => {
	Dishes.remove ({_id: req.body.id}, err => {
		if (err)
			console.log (err);
		else
			res.json (true);
	});
});

router.post ('/addProduct', (req, res) => {
	timeProduct = new Date (); // time when product will be expired 
	expireTime = req.body.expire [0] * 3600 + req.body.expire [1] * 60 + req.body.expire [2]// time to live from client 
	let product = new Product ();
	product.name = req.body.name;
	product.value = req.body.value;
	product.expire = timeProduct.setSeconds (timeProduct.getSeconds () + expireTime) // array[hh, mm, ss];
	product.save ();
	res.json (true);
});

module.exports = router;