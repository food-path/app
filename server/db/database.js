const Sequelize = require("sequelize");

let config
if (process.env.DATABASE_URL) {
  config = {
    logging: false, //put true if you like the logs
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
} else {
  config = {
    logging: false
  }
}

const db = new Sequelize(
	process.env.DATABASE_URL || "postgres://localhost:5432/foodpath",
	config
);

module.exports = db;
