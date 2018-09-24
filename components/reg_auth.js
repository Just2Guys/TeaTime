//models
const User = require ("../models/user");
const md5 = require ("md5");

class reg_auth {
	
	createPassword (pass, login) {
		return md5 ("look at" + pass + "that security" + login);
	}

	createNewUser (data) {
		let user = new User ();
		user.role = 0;
		user.name = data.name;
		user.surname = data.surname;
		user.password = this.createPassword (data.password, data.login);
		user.login = data.login;
		user.save ();
	}	

	validUserData (data) {
		if (data.role > 2 || data.role < 0) {
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

	async getUserDataByPass (password) {
		try {
			let data = await User.findOne ({password: password});	
			return data;
		} catch (error) {
			return "Error";
		}
	}

	async getUserDataByLogin (login) {
		try {
			let data = await User.findOne ({login: login});
			return data;
		} catch (error) {
			return "Error";
		}
	}
};


module.exports = reg_auth;