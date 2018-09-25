const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema ({
	title: {type: String, required: true},
	image: {type: String, required: true},
	description: {type:String, required: true},
	recipe: {type: Array, required: true},
	price: {type: Number, require: true}
});

module.exports = mongoose.model ('Menu', MenuSchema);