const router = require ("express").Router ();
const userFunctions = require ("../components/user_functions");

router.post ('/register', (req, res) => {
	canCreate = userFuncitons.validUserData (req.body.data);

	if (canCreate == true) {
		userFunctions.createNewUser (req.body.data);
		res.send (true); //success
	} else res.send (false); // failrule 
});

router.post ('/login', async (req, res) => {
	userData = await userFunctions.getUserDataByLogin (req.body.login);
	userPass = userFunctions.createPassword (req.body.password, req.body.login);
	
	if (userPass == userData.password) {
		req.session.pass = userPass;
		res.send (true);
	} else {
		res.send (false);
	}
});

router.get ('/info', async (req, res) => {
	if (!req.session.pass) {
		res.send ("Not logged in!");
		return false;
	}

	result = await userFunctions.getUserDataByPass (req.session.pass);
	res.send (result);
});



module.exports = router;