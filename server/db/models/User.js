const crypto = require("crypto");
const _ = require("lodash");
const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
	// define your model here!
	firstName: {
		type: Sequelize.STRING,
		// allowNull: false,
		// unique: true,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	lastName: {
		type: Sequelize.STRING,
		// allowNull: false,
		// unique: true,
		// validate: {
		// 	notEmpty: true,
		// },
	},
	email: {
		type: Sequelize.STRING,
		// unique: true,
		// allowNull: false,
		// validate: {
		// 	isEmail: true
		// }
	},
	imageUrl: {
		type: Sequelize.STRING,
		defaultValue:
		  'https://img.favpng.com/21/4/9/portable-network-graphics-avatar-computer-icons-image-social-media-png-favpng-r3ez8qWcYdM8jGVn2b5TGhvS8.jpg'
	},
	isLoggedIn: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	password: {
		type: Sequelize.STRING,
	},
	salt: {
		type: Sequelize.STRING,
	},
	googleId: {
		type: Sequelize.STRING,
	}
});

// instance methods
//if you type the pw on the website it'll tell you if it's correct or not
User.prototype.correctPassword = function (candidatePassword) {
	return User.encryptPassword(candidatePassword, this.salt) === this.password;
};

//on our api when we list our password/salt in json, it won't display it
User.prototype.sanitize = function () {
	return _.omit(this.toJSON(), ["password", "salt"]);
};

// class methods
//salt is a unique field for each user. which our hash table, if we hash "annie" it'll give you the same result every time but we don't want it to happen every time
User.generateSalt = function () {
	return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
	const hash = crypto.createHash("sha1");
	hash.update(plainText);
	hash.update(salt);
	return hash.digest("hex");
};

function setSaltAndPassword(user) {
	// we need to salt and hash again when the user enters their password for the first time
	// and do it again whenever they change it
	if (user.changed("password")) {
		user.salt = User.generateSalt();
		user.password = User.encryptPassword(user.password, user.salt);
	}
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
User.beforeBulkCreate((users) => {
	users.forEach(setSaltAndPassword);
});

module.exports = User;
