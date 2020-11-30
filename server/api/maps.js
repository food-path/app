const router = require("express").Router();
const { Foodiemap, Business, User } = require("../db");

router.get("/", async (req, res, next) => {
	try {
		const maps = await Foodiemap.findAll({
			include: Business,
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



router.post("/", async (req, res, next) => {
	try {
		const map = await Foodiemap.create({
			name: req.body.body.name,
			searchBody: JSON.stringify(req.body.search),
		});
		for (let i = 0; i < req.body.markers.length; i++) {
			const marker = req.body.markers[i];
			const [business] = await Business.findOrCreate({
				where: {
					id: marker.id,
				},
				defaults: {
					name: marker.name,
					country: marker.location.country,
					city: marker.location.city,
					streetAddress: marker.location.address1,
					latitude: marker.coordinates.latitude,
					longitude: marker.coordinates.longitude,
					imageUrl: marker.image_url,
					categories: marker.categories.map((cat) => cat.alias),
					reviewCount: marker.review_count,
					rating: marker.rating,
					price: marker.price,
				},
			});
			await map.addBusiness(business);
		}
		res.send(map);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
