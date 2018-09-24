const router = require ("express").Router ();
const regAuthClass = new (require ("../components/reg_auth"));
const orderHelper = new (require ("../components/order"));



router.post ('/register', async (req, res) => {
	canCreate = regAuthClass.validUserData (req.body.data);
	userData = await regAuthClass.getUserDataByLogin (req.body.data.login);

	if (canCreate == true && !userData) {
		regAuthClass.createNewUser (req.body.data);
		res.json (true); //success
	} else res.json (false); // failrule 
});

router.post ('/login', async (req, res) => {
	userData = await regAuthClass.getUserDataByLogin (req.body.login);
	userPass = regAuthClass.createPassword (req.body.password, req.body.login);
	
	if (userPass == userData.password) {
		req.session.pass = userPass;
		res.json (userData);
	} else {
		res.json (false);
	}
});

router.get ('/info', async (req, res) => {
	if (!req.session.pass) {
		res.json (false);
		return false;
	}

	result = await regAuthClass.getUserDataByPass (req.session.pass);
	res.json (result);
});

router.get ('/exit', (req, res) => {
	req.session.pass = "";
	res.json (true);
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