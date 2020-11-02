import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./user";
import thunkMiddle from "redux-thunk";
//npm install --save redux-devtools-extension for redux dev tools
import { composeWithDevTools } from "redux-devtools-extension";
//redux logger
import { createLogger } from "redux-logger";

export const rootReducer = combineReducers({
	user: userReducer,
});

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddle, createLogger({ collapsed: true }))
);

const store = createStore(rootReducer, middleware);

export default store;
