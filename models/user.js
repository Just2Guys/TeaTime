const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

// 2 - admin
// 1 - car driver
// 0 - simple user

const UserSchema = new Schema ({
	role: {type: Number, required: true},
	name: {type: String, required: true},
	surname: {type: String, required: true},
	password: {type: String, required: true},
	login: {type: String, required: true}
});

module.exports = mongoose.model ('Users', UserSchema);