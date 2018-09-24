const router = require ("express").Router ();

const Menu = require ("../models/menu");
const Products = require ("../models/product");

router.get ('/menu', (req, res) => {
	Menu.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

router.get ('/products', (req, res) => {
	Products.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

module.exports = router;