//models
const User = require ("../models/user");

const md5 = require ("md5");

function createPassword (pass, login) {
	return md5 ("look at" + data.password + "that security" + data.login);
}

function createNewUser (data) {
	let user = new User ();
	user.role = data.role;
	user.name = data.name;
	user.surname = data.surname;
	user.password = createPassword (data.password, data.login);
	user.login = data.login;
	user.save ();
}

function validUserData (data) {
	if (data.role > 3 || data.role < 0) {
		return false;
	} else if (typeof data.name !== "string" || typeof data.surname !== "string") {
		return false;
	} else if (!data.name || !data.surname) {
		return false;
	} else if (!data.password || typeof data.password !== "string" || data.password.length < 5) {
		return false;
	} else if (!data.login || typeof data.login !== "string") {
		return false;
	}

	return true;
}

async function getUserDataByPass (password) {
	try {
		data = await User.findOne ({password: password});	
		return data;
	} catch (error) {
		return "Error";
	}
}

async function getUserDataByLogin (login) {
	try {
		data = await User.findOne ({login: login});
		return data;
	} catch (error) {
		return "Error";
	}
}



module.exports = {
	createNewUser: createNewUser,
	validUserData: validUserData,
	getUserDataByPass: getUserDataByPass,
	getUserDataByLogin: getUserDataByLogin,
	createPassword: createPassword
};