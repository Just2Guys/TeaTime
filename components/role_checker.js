const Users = require ("../models/user");
	
async function checkRole (requiredRole, password) {	
	let user = await Users.findOne ({password: password});
	return user.role >= requiredRole ? true : false;  
};


module.exports = checkRole;