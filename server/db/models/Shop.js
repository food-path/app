const Sequelize = require("sequelize");
const db = require("../database");

//README UNREGISTER 1 - make a model, make sure to stick notEmpty inside of a validate
module.exports = db.define("shop", {
	// define your model here!
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});
