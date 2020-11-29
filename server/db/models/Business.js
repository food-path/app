const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("business", {
	// define your model here!
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
	},
	name: {
		type: Sequelize.STRING,
	},
	country: {
		type: Sequelize.STRING,
	},
	city: {
		type: Sequelize.STRING,
	},
	streetAddress: {
		type: Sequelize.STRING,
	},
	latitude: {
		type: Sequelize.DECIMAL,
	},
	longitude: {
		type: Sequelize.DECIMAL,
	},
	imageUrl: {
		type: Sequelize.STRING,
	},
	categories: {
		type: Sequelize.ARRAY(Sequelize.STRING),
	},
	reviewCount: {
		type: Sequelize.INTEGER,
	},
	rating: {
		type: Sequelize.INTEGER,
	},
	price: {
		type: Sequelize.STRING,
	},
});
