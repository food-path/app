"use strict";

const db = require("./database");
//Question: Candy in {} and is it ("../models/Candy")
const Candy = require("./models/Candy");
const Shop = require("./models/Shop");
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

Candy.belongsTo(Shop);
Shop.hasMany(Candy);

module.exports = {
	// Include your models in this exports object as well!
	Candy,
	Shop,
	User,
	db,
};
