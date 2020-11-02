const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("candy", {
	// define your model here!
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			notEmpty: true,
		},
	},
	quantity: {
		type: Sequelize.INTEGER,
		validate: {
			min: 0,
			max: 10,
		},
	},
	imageUrl: {
		type: Sequelize.TEXT,
		validate: {
			isUrl: true,
		},
		defaultValue:
			"https://i.pinimg.com/236x/85/3e/1e/853e1e2184f286056c7ea3c0e1348b00--funny-things-funny-stuff.jpg",
	},
});
