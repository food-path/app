"use strict";

const db = require("./database");
const Foodiemap = require("./models/Foodiemap");
const Business = require("./models/Business");
const User = require("./models/User");

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).
// Example:
//
// const Puppy = require('./puppy')
// const Owner = require('./owner')

// After you've required all of your models into this module, you should establish
// associations (https://sequelize-guides.netlify.com/association-types/) between them here as well!
// Example:
//
// Puppy.belongsTo(Owner)

Foodiemap.belongsTo(User);
User.hasMany(Foodiemap);
Foodiemap.belongsToMany(Business, { through: "foodiemap_business" });
Business.belongsToMany(Foodiemap, { through: "foodiemap_business" });
User.belongsToMany(User, { through: "user_to_user", as: "friends" });

module.exports = {
	// Include your models in this exports object as well!
	db,
	Foodiemap,
	Business,
	User,
};
