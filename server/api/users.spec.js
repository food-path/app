import { expect } from "chai";
import supertest from "supertest";
import { db, User } from "../db";
import app from "../index";

describe("Testing User route", () => {
	beforeEach(async () => {
		await db.sync({ force: true });
		await User.create({ name: "Annie" });
	});

	it("GET /api/users", async () => {
		const res = await supertest(app).get("/api/users").expect(200);
		expect(res.body).to.be.an("array");
		expect(res.body[0].name).to.be.equal("Annie");
	});
});
