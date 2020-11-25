"use strict";

const db = require("./database");
<<<<<<< HEAD
//Question: Candy in {} and is it ("../models/Candy")
=======
const Foodiemap = require("./models/Foodiemap");
>>>>>>> bc2acb3c0b758c3abe85892bf98aad5e1ffa6cae
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

// const CandyInstance = Candy.create();

<<<<<<< HEAD
// Candy.belongsTo(Shop);
// Shop.hasMany(Candy);

module.exports = {
	// Include your models in this exports object as well!
	// Candy,
=======
Foodiemap.belongsTo(User);
User.hasMany(Foodiemap);
Business.belongsToMany(Foodiemap, {through: "FoodiemapDetails"});
Foodiemap.belongsToMany(Business, {through: "FoodiemapDetails"});

module.exports = {
	// Include your models in this exports object as well!
	db,
	Foodiemap,
>>>>>>> bc2acb3c0b758c3abe85892bf98aad5e1ffa6cae
	Business,
	User,
};
