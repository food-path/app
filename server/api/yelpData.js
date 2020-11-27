const axios = require("axios");
const router = require("express").Router();

let API_KEY = process.env.YELP_API_KEY;

let yelpREST = axios.create({
	baseURL: "https://api.yelp.com/v3/",
	headers: {
		Authorization: `Bearer ${API_KEY}`,
		"Content-type": "application/json",
	},
});

router.get("/search/:location", async (req, res, next) => {
	try {
		const { data } = await yelpREST("/businesses/search", {
			params: {
				location: req.params.location,
				term: "vegan",
				limit: 10,
			},
		});

		let { businesses } = data;
		res.send(businesses);
	} catch (error) {
		next(error);
	}
});

// REST

module.exports = router;
