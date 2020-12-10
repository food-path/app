import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store";
import App from "./app";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

//TODO: check out serviceworkies
// const { generateSW } = require("workbox-build");
// import { generateSW } from "workbox-build";
// const swDest = "/sw.js";
// generateSW({
// 	swDest,
// 	// Other configuration options...
// }).then(({ count, size }) => {
// 	console.log(
// 		`Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
// 	);
// });

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("app")
);
