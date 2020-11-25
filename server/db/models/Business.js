const Sequelize = require("sequelize");
const db = require("../database");

module.exports = db.define("business", {
	// define your model here!
	name: {
		type: Sequelize.STRING,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	country: {
		type: Sequelize.STRING,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	city: {
		type: Sequelize.STRING,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	streetAddress: {
		type: Sequelize.STRING,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	latitude: {
		type: Sequelize.DECIMAL,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	longitude: {
		type: Sequelize.DECIMAL,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	imageUrl: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		// defaultValue: [
		// 	'https://www.gannett-cdn.com/presto/2020/08/17/PMJS/de753cd1-2a22-4851-bc76-8cd9eac58eb3-Sorella-Pork_Chop_with_Cherry_Pepper_Sauce.jpg',
		// 	'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2010%2F12%2F201012-ss-dishes-lamb-ragu.jpg',
		// 	'https://i1.wp.com/berriesandspice.com/wp-content/uploads/2018/08/Berries-and-Spice-How-to-plate-dishes-worthy-of-a-fine-dining-restaurant-the-complete-guide-23.jpg?fit=3369%2C2246&ssl=1',
		//   ]
	},
	diet: {
		type: Sequelize.ARRAY(Sequelize.STRING),
	},
	reviews: {
		type: Sequelize.FLOAT,
		// validate: {
		// 	min: 1,
		// 	max: 5,
		// },
	},
	website: {
		type: Sequelize.STRING,
		// allowNull: false,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	budget: {
		type: Sequelize.INTEGER,
		// validate: {
		// 	min: 1,
		// 	max: 4,
		// },
	},
	businessType: {
		type: Sequelize.STRING,
		
	},
});