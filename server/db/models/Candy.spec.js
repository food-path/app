const { Candy, db } = require("..");
const { expect } = require("chai");

describe("testing Candy model", () => {
	beforeEach(async () => {
		await db.sync({ force: true });
	});

	it("requires name", async () => {
		try {
			const chocolate = await Candy.create({ description: "Is good" });
			throw Error("Creating this candy should have failed");
		} catch (error) {
			expect(error.message).to.contain("candy.name cannot be null");
		}
	});
});
