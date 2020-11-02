const router = require("express").Router();
const { User } = require("../db");

router.post("/login", async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				name: req.body.name,
			},
		});
		if (!user) req.sendStatus(401);
		else if (!user.correctPassword(req.body.password))
			req.status(401).send("Incorrect password");
		else {
			req.login(user, (error) => (error ? next(error) : res.json(user)));
		}
	} catch (error) {
		next(error);
	}
});

router.post("/signup", async (req, res, next) => {
	try {
		const { name, password } = req.body;
		const user = await User.create(req.body);
		req.login(user, (error) => (error ? next(error) : res.json(user)));
	} catch (error) {
		next(error);
	}
});

router.post("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect("/");
});

//from the workshop
// router.delete('/logout', (req, res, next) => {
//   req.logout();
//   req.session.destroy()
//   res.sendStatus(204);
// });

router.get("/me", (req, res, next) => {
	res.json(req.user);
});

router.use("/google", require("./google"));

module.exports = router;
