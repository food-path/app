import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user";
import thunkMiddle from "redux-thunk";
//npm install --save redux-devtools-extension for redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
//redux logger
import { createLogger } from "redux-logger";
import markers from "./markers";

export const rootReducer = combineReducers({
	user: userReducer,
	markers,
});

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddle, createLogger({ collapsed: true }))
);

const store = createStore(rootReducer, middleware);

export default store;
export * from "./user";
export * from "./markers";
