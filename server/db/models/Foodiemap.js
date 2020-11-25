const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("foodiemap", {
	// define your model here!
	title: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	numBusinesses: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
			max: 3,
		},
	},
	businesses: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
	},
	favorite: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	}
});