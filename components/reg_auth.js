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
		//return type of error, if errors are existed send 0
		if (typeof data.login !== "string" || data.login.length > 32) {
			return 1;
		} else if (typeof data.name !== "string" || typeof data.surname !== "string" || data.name.length > 32 || data.surname.length > 32) {
			return 2;
		} else if (typeof data.password !== "string" || data.password.length < 5) {
			return 3;
		} else 

		return 0;
	}

	checkPassword (login, client_password, session) {
		let password = this.createPassword (client_password, login);
		return password == session;
	}

	async getUserDataByPass (password) {
		try {
			let data = await User.findOne ({password: password});	
			return data;
		} catch (error) {
			return false;
		}
	}

	async getUserDataByLogin (login) {
		try {
			let data = await User.findOne ({login: login});
			return data;
		} catch (error) {
			return false;
		}
	}

	updateData (password, data, newPassword) {
		
		if (data.password) {
			data.password = newPassword;
			console.log (data.password);
		}

		User.updateOne ({password: password}, {'$set': data}).exec ();
	}
};


module.exports = reg_auth;