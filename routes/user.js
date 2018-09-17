const router = require ("express").Router ();
const regAuthClass = new (require ("../components/reg_auth"));
const orderHelper = new (require ("../components/order"));

router.post ('/register', (req, res) => {
	canCreate = regAuthClass.validUserData (req.body.data);

	if (canCreate == true) {
		regAuthClass.createNewUser (req.body.data);
		res.json (true); //success
	} else res.json (false); // failrule 
});

router.post ('/login', async (req, res) => {
	userData = await regAuthClass.getUserDataByLogin (req.body.login);
	userPass = regAuthClass.createPassword (req.body.password, req.body.login);
	
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

	result = await regAuthClass.getUserDataByPass (req.session.pass);
	res.json (result);
});

router.post ('/makeOrder', async (req, res) => {
	let orders = req.body.orders;
	ordersResults = [];

	for (let order of orders) {
		let canOrder = await orderHelper.canMakeDish (order);

		if (canOrder == true) {
			orderHelper.makeOrder (order);
			ordersResults.push (1)
		} else {
			ordersResults.push (0);
		}
	}

	res.json (ordersResults);
});

module.exports = router;