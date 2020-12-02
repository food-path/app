const router = require("express").Router();
const { User } = require("../db");

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

router.post('/search', async (req, res, next) => {
	try {
	  await User.create(req.body)
	  res.send(201)
	} catch (error) {
	  next(error)
	}
  })

module.exports = router;
