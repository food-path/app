const router = require("express").Router();
const { User } = require("../db");

router.post("/login", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});
		if (!user) {
			console.log("No such user found:", req.body.email);
			req.sendStatus(401).send("Incorrect email");
		} else if (!user.correctPassword(req.body.password)) {
			console.log("Incorrect password for user:", req.body.email);
			req.status(401).send("Incorrect password");
		} else {
			req.login(user, (error) => (error ? next(error) : res.json(user)));
		}
	} catch (error) {
		next(error);
	}
});

router.post("/signup", async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = await User.create({
			firstName,
			lastName,
			email,
			password,
			registrationDate: new Date(),
		});
		req.login(user, (error) => (error ? next(error) : res.json(user)));
	} catch (error) {
		if (error.name === "SequelizeUniqueConstraintError") {
			res.status(401).send("User already exists");
		} else {
			next(error);
		}
	}
});

router.post("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect("/");
});

router.get("/me", (req, res, next) => {
	res.json(req.user);
});

router.use("/google", require("./google"));

module.exports = router;
