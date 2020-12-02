const Sequelize = require("sequelize");

const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost:5432/foodpath",
	{
		logging: false, //put true if you like the logs
	}
);

module.exports = db;
