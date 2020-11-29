"use strict";

const { db } = require("../server/db");
const { User, Business, Foodiemap } = require("../server/db");
const faker = require("faker");
const { red } = require("chalk");

const usersArray = [];
const businessesArray = [];
const foodiemapsArray = [];

async function seed() {
	// try {
	await db.sync({ force: true });
	console.log("db synced!");

	for (let i = 0; i < 10; i++) {
		usersArray.push({
			firstName: `${faker.name.firstName()}`,
			lastName: `${faker.name.lastName()}`,
			email: `${faker.internet.email()}`,
			password: "hello",
			imageUrl: `${faker.internet.avatar()}`,
		});

		// businessesArray.push({
		// 	name: `${faker.company.companyName()}`,
		// 	country: `${faker.address.country()}`,
		// 	city: `${faker.address.city()}`,
		// 	streetAddress: `${faker.address.streetAddress()}`,
		// 	latitude: `${faker.address.latitude()}`,
		// 	longitude: `${faker.address.longitude()}`,
		// 	imageUrl: [
		// 		`${faker.image.imageUrl()}`,
		// 		`${faker.image.imageUrl()}`,
		// 		`${faker.image.imageUrl()}`,
		// 	],
		// 	diet: [
		// 		`${faker.commerce.productAdjective()}`,
		// 		`${faker.commerce.productAdjective()}`,
		// 		`${faker.commerce.productAdjective()}`,
		// 	],
		// 	reviews: `${faker.commerce.price()}`,
		// 	website: `${faker.internet.url()}`,
		// 	budget: `${faker.random.number()}`,
		// 	businessType: `${faker.company.bsNoun()}`,
		// });

		foodiemapsArray.push({
			name: `${faker.lorem.words()}`,
			// city: `${faker.address.city()}`,
			// numBusinesses: `${faker.random.number()}`,
			// listOfBusinesses: [
			// 	`${faker.company.bsNoun()}`,
			// 	`${faker.company.bsNoun()}`,
			// 	`${faker.company.bsNoun()}`,
			// ],
			favorite: `${faker.random.boolean()}`,
		});
	}

	const users = await Promise.all(
		usersArray.map((user) => {
			return User.create(user);
		})
	);

	const foodiemaps = await Promise.all(
		foodiemapsArray.map((foodiemap) => {
			return Foodiemap.create(foodiemap);
		})
	);

	const businesses = await Promise.all(
		businessesArray.map((business) => {
			return Business.create(business);
		})
	);

	console.log(`seeded ${users.length} users`);
	console.log(`seeded ${businesses.length} businesses`);
	console.log(`seeded ${foodiemaps.length} foodiemaps`);
	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
