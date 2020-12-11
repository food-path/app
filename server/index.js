const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { db, User } = require("./db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require("passport");
const enforce = require("express-sslify");

//TODO: trying to figure out how to redirect http to https
// app.use((req, res, next) => {
// 	if (req.protocol === "http" && !req.headers.host.includes("localhost")) {
// 		res.redirect(`https://${req.headers.host}${req.url}`);
// 	} else {
// 		next();
// 	}
// });

if (process.env.NODE_ENV === "development") {
	require("../secrets"); // this will mutate the process.env object with your secrets.
}

passport.serializeUser((user, done) => {
	try {
		done(null, user.id);
	} catch (err) {
		done(err);
	}
});

passport.deserializeUser((id, done) => {
	User.findByPk(id, {
		include: {
			model: User,
			as: "friends",
		},
	})
		.then((user) => done(null, user))
		.catch(done);
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));
//better parsing middleware than body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "development")
	app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(
	session({
		secret: process.env.SESSION_SECRET || "a wildly insecure secret",
		store: dbStore,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

//this mounts our api router
app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

//* means any route
app.use("*", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

//handle 500 error
//Content-Type tells you it's an html element so you can display a fail whale
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.set("Content-Type", "text/html");
	console.log(err.message);
	res.send('<img src="http://pbs.twimg.com/media/Cdm8JYPUAAAoPmm.jpg"/>');
});

//process.env.PORT lets you change to any port in the terminal with 'PORT=xxxx nodemon server/index.js' otherwise this will default to 3000
async function startServer() {
	await db.sync();
	await dbStore.sync();
	const port = process.env.PORT || 3000;

	const server = app.listen(port, () =>
		console.log(`Finding food at ${port}!`)
	);
}
//sometimes in testspecs you want to require the app but not start the server
if (require.main === module) {
	startServer();
}
module.exports = app;
