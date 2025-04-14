const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	Title: {
		type: String,
		required: true,
	},
	Descriptions: {
		type: String,
		required: true,
	},
	Prices: {
		type: Number,
		required: true,
	},
	
	image: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
