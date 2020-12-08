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
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	country: {
		type: Sequelize.STRING,
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	city: {
		type: Sequelize.STRING,
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	streetAddress: {
		type: Sequelize.STRING,
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	latitude: {
		type: Sequelize.DECIMAL,
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	longitude: {
		type: Sequelize.DECIMAL,
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
	},
	categories: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		allowNull: false, 
		validate: {
			notEmpty: true
		}
	},
	reviewCount: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
		notEmpty: true,
		min: 0
		}
	},
	rating: {
		type: Sequelize.INTEGER,
		validate: {
			notEmpty: true,
			min: 4
		  }
	},
	price: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
		notEmpty: true,
		}
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
