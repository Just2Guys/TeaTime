const Users = require ("../models/user");
	
async function checkRole (requiredRole, password, test) {
	
	if (test) {
		return true;
	}

	let user = await Users.findOne ({password: password});
	return user.role >= requiredRole ? true : false;  
};


module.exports = checkRole;