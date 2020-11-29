const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/yelp", require("./yelpData"));
router.use("/maps", require("./maps"));

router.use((req, res, next) => {
	const myError = new Error("404 - Not Found!");
	myError.status = 404;
	next(myError);
});

module.exports = router;
