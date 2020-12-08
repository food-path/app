const router = require("express").Router();
const { User, Foodiemap, Business } = require("../db");

router.get("/", async (req, res, next) => {
	try {
		const users = await User.findAll({
			attributes: ["id", "email"],
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
});

//GET /:id --> this grabs the id for the other user
router.get("/:id", async (req, res, next) => {
	try {
		const otherUser = await User.findByPk(req.params.id, {
			include: [
				{ model: User, as: "friends" },
				{ model: Foodiemap, include: Business },
			],
		});
		res.send(otherUser);
	} catch (error) {
		next(error);
	}
});

router.post("/search", async (req, res, next) => {
	try {
		await User.create(req.body);
		res.send(201);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		if (!req.user || req.user.id !== +req.params.id) return res.sendStatus(401);

		const { firstName, lastName, email, password, imageUrl } = req.body;
		const user = await User.findByPk(req.params.id);
		await user.update({
			firstName: firstName || user.firstName,
			lastName: lastName || user.lastName,
			email: email || user.email,
			password: password || user.password,
			imageUrl: imageUrl || user.imageUrl,
		});
		res.send(user);
	} catch (error) {
		next(error);
	}
});

router.put("/addFriend/:id", async (req, res, next) => {
	try {
		const friend = await User.findByPk(req.params.id);
		await req.user.addFriend(friend);
		await friend.addFriend(req.user);
		res.send(friend);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
