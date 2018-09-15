const router = require ("express").Router ();
const regAuthMethods = require ("../components/reg_auth");
const orderMethods = require ("../components/order");

router.post ('/register', (req, res) => {
	canCreate = regAuthMethods.validUserData (req.body.data);

	if (canCreate == true) {
		regAuthMethods.createNewUser (req.body.data);
		res.json (true); //success
	} else res.json (false); // failrule 
});

router.post ('/login', async (req, res) => {
	userData = await regAuthMethods.getUserDataByLogin (req.body.login);
	userPass = regAuthMethods.createPassword (req.body.password, req.body.login);
	
	if (userPass == userData.password) {
		req.session.pass = userPass;
		res.json (true);
	} else {
		res.json (false);
	}
});

router.get ('/info', async (req, res) => {
	if (!req.session.pass) {
		res.json ("Not logged in!");
		return false;
	}

	result = await regAuthMethods.getUserDataByPass (req.session.pass);
	res.json (result);
});

router.post ('/makeOrder', async (req, res) => {
	let orders = req.body.orders;
	ordersResults = [];

	for (let order of orders) {
		let canOrder = await orderMethods.canMakeDish (order);

		if (canOrder == true) {
			orderMethods.makeOrder (order);
			ordersResults.push (1)
		} else {
			ordersResults.push (0);
		}
	}

	res.json (ordersResults);
});

module.exports = router;