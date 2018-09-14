const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema ({
	product: {type: String, required: true},
	value: {type: Number, required: true},
	expire: {type: Date, required: true }
});

module.exports = mongoose.model ('Products', ProductSchema);