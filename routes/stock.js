const router = require ("express").Router ();

const Menu = require ("../models/menu");
const Products = require ("../models/product");

router.get ('/menu/:skip', async (req, res) => {
	let menu = await Menu.find ({}, null, { skip: Number (req.params.skip * 10) }).limit (10);
	!menu ? res.json (false) : res.json (menu);
});

router.get ('/products', (req, res) => {
	Products.find ({}, (err, data) => {
		err ? console.log (err) : res.json (data);
	});
});

module.exports = router;