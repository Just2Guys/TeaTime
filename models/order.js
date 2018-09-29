const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema ({
	dishes:{type: Array, required: true},
	login: {type: String, required: true},
	place: {type: Object, required: true}
});

module.exports = mongoose.model ("Orders", OrderSchema);