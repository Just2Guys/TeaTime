const router = require ("express").Router ();
const regAuthClass = new (require ("../components/reg_auth"));
const orderHelper = new (require ("../components/order"));


router.post ('/register', async (req, res) => {
	let typeOfError = 0;
	let userData = await regAuthClass.getUserDataByLogin (req.body.data.login);

	if (userData) {
		typeOfError = 4;
	} else {
		typeOfError = regAuthClass.validUserData (req.body.data);
	}

	if (typeOfError == 0 && !userData) {
		regAuthClass.createNewUser (req.body.data);
		req.session.pass = regAuthClass.createPassword (req.body.data.password, req.body.data.login);
	}

	res.json (typeOfError);
});

router.post ('/login', async (req, res) => {
	userData = await regAuthClass.getUserDataByLogin (req.body.login);
	userPass = regAuthClass.createPassword (req.body.password, req.body.login);

	if (!userData || userPass != userData.password) {
		res.json (false);
	} else {
		req.session.pass = userPass;
		res.json (userData);
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
	let orderResults = [];
	let orders = [];

	for (let title of req.body.dishes) {
		let canOrder = await orderHelper.canMakeDish (title);

		if (canOrder == false) {
			orderResults.push (0);
			continue;
		}

		orderHelper.makeDish (title);
		orderResults.push (1);
		orders.push(title);
	}

	orderHelper.saveOrder (orders, req.body.place, req.body.login);
	res.json (orderResults);
});

module.exports = router;