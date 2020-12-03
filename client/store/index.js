import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user";
import businessReducer from "./singleBusiness"
import thunkMiddle from "redux-thunk";
//npm install --save redux-devtools-extension for redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
//redux logger
import { createLogger } from "redux-logger";
import markers from "./markers";
import search from "./search";
import maps from "./maps";

export const rootReducer = combineReducers({
	user: userReducer,
	singleBusiness: businessReducer,
	markers,
	search,
	maps,
});

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddle, createLogger({ collapsed: true }))
);

const store = createStore(rootReducer, middleware);

export default store;
export * from "./user";
export * from "./markers";
export * from "./search";
export * from "./maps";
