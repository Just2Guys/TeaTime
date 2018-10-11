const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema ({
	userId: {type: String, required: true},
	cords: {type: Array, required: true},
	order: {type: Object, required: true},
	client: {type: String, required: true}
});

module.exports = mongoose.model ("cars", CarSchema);