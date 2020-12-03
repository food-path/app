const router = require("express").Router();
const { Foodiemap, Business, User } = require("../db");
const { findOrCreateFromYelpMarker } = require("../db/models/Business");

router.get("/", async (req, res, next) => {
	try {
		const maps = await Foodiemap.findAll({
			include: [Business, User],
		});
		res.send(maps);
	} catch (error) {
		next(error);
	}
});


//get route for a single business by id
router.get('/:businessId', (req, res, next) => {
	Business.findByPk(req.params.businessId)
	  .then(business => res.json(business))
	  .catch(next)
  })


// mounted on /api/maps
router.post("/", async (req, res, next) => {
	try {
		let map = await Foodiemap.create({
			name: req.body.body.name,
			searchBody: JSON.stringify(req.body.search),
		});

		for (let i = 0; i < req.body.markers.length; i++) {
			const marker = req.body.markers[i];
			const business = await Business.findOrCreateFromYelpMarker(marker);
			await map.addBusiness(business);
		}

		if (req.user) {
			await map.setUser(req.user);
			map = await Foodiemap.findByPk(map.id, {
				include: [User, Business],
			});
		} else {
			map = await Foodiemap.findByPk(map.id, {
				include: Business,
			});
		}

		res.send(map);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
