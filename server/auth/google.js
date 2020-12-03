const router = require("express").Router();
const passport = require("passport");
const { User } = require("../db");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

if (!process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CLIENT_ID)
	console.log("Google client ID / secret not found. Skipping Google OAuth.");
else {
	// collect our google configuration into an object
	const googleConfig = {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: "/auth/google/callback",
	};

	// configure the strategy with our config object, and write the function that passport will invoke after google sends
	// us the user's profile and access token
	const strategy = new GoogleStrategy(
		googleConfig,
		function (token, refreshToken, profile, done) {
			const googleId = profile.id;
			const email = profile.emails[0].value;
			const imageUrl = profile.photos[0].value;
			const firstName = profile.name.givenName;
			const lastName = profile.name.familyName;

			User.findOrCreate({
				where: { googleId },
				defaults: {
					email,
					imageUrl,
					firstName,
					lastName,
					registrationDate: new Date(),
				},
			})
				.then(([user]) => done(null, user))
				.catch(done);
		}
	);

	// register our strategy with passport
	passport.use(strategy);

	router.get(
		"/",
		passport.authenticate("google", { scope: ["email", "profile"] })
	);

	router.get(
		"/callback",
		passport.authenticate("google", {
			successRedirect: "/search",
			failureRedirect: "/login",
		})
	);
}

module.exports = router;
