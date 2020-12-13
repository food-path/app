import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./app";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

// //TODO: check out serviceworkies
// // const { generateSW } = require("workbox-build");
// import { generateSW } from "workbox-build";
// // const swDest = "/sw.js";
// import swDest from "./sw.js";
// generateSW({
// 	swDest,
// 	// Other configuration options...
// }).then(({ count, size }) => {
// 	console.log(
// 		`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
// 	);
// });

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("sw.js")
		.then((registration) => {
			console.log("SW Registered!");
			console.log(registration);
		})
		.catch((error) => {
			console.log("SW Registration Failed!");
			console.log(error);
		});
}

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("app")
);
