const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("business", {
	// define your model here!
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
});
