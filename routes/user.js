const router = require ("express").Router ();
const regAuthClass = new (require ("../components/reg_auth"));
const orderHelper = new (require ("../components/order"));

const events = require ("events");
const emitter = new events.EventEmitter ();

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

router.post ('/updateData', async (req, res) => {
		// userPassword: ';ksfdfjfmkls',
		// dataToChange: {
		// 	'anme'
		// }
	if (!req.session.pass) {
		res.json (false);
		return false;
	}

	let user = await regAuthClass.getUserDataByPass (req.session.pass);
	let correct_pass = regAuthClass.checkPassword (user.login, req.body.userPassword, req.session.pass);

	if (correct_pass == false) {
		res.json (false);
		return false;
	}

	regAuthClass.updateData (req.session.pass, req.body.dataToChange, password);

	if (req.body.data.dataToChange.password) {
		let password = regAuthClass.createPassword (req.body.dataToChange.password, user.login);
		req.session.pass = password;
	}

	res.json (true);
});

router.get ('/haveOrder', async (req, res) => {

	if (!req.session.pass) {
		res.json (false);
		return false;
	}

	let user = await regAuthClass.getUserDataByPass (req.session.pass);
	let userInOrder = await orderHelper.userInOrder (user._id, user.login);
	
	res.json (userInOrder);
});

router.post ('/makeOrder', async (req, res) => {
	let checkResults = [];
	let user = await regAuthClass.getUserDataByPass (req.session.pass);

	if (!user) {
		res.json (false);
		return false;
	}

	let userInOrder = await orderHelper.userInOrder (user._id, user.login);

	if (userInOrder === true) {
		//we can't order because you can store only one order
		res.json (false);
		return false;
	}

	for (let title of req.body.dishes) {
		let canOrder = await orderHelper.canMakeDish (title);

		if (canOrder == false) {
			checkResults.push (title);
		}		
	}


	if (checkResults.length != 0) {
		res.json (checkResults);
		return false;
	}

	for (let title of req.body.dishes) {
		orderHelper.makeDish (title);
	}


	let order = orderHelper.saveOrder (req.body.dishes, req.body.place, user.login);
	emitter.emit ("newOrder", order);
	res.json (checkResults);
});

module.exports = {
	router: router,
	emitter: emitter
};