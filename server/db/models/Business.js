const Sequelize = require("sequelize");
const db = require("../database");

//TODO: add validations, ratings with min and max value to prevent weird things from happening. unique, not empty, not null, default values for review count

const Business = db.define("business", {
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

Business.findOrCreateFromYelpMarker = async function (marker) {
	const [business] = await Business.findOrCreate({
		where: {
			id: marker.id,
		},
		defaults: {
			name: marker.name,
			country: marker.location.country,
			city: marker.location.city,
			streetAddress: marker.location.address1,
			latitude: marker.coordinates.latitude,
			longitude: marker.coordinates.longitude,
			imageUrl: marker.image_url,
			categories: marker.categories.map((cat) => cat.alias),
			reviewCount: marker.review_count,
			rating: marker.rating,
			price: marker.price,
		},
	});
	return business;
};

module.exports = Business;
