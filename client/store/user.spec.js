import { expect } from "chai";
import thunkMiddleware from "redux-thunk";
import configureMockStore from "redux-mock-store";
import store from ".";
import { createStore } from "redux";
import { rootReducer } from ".";

// const middlewares = [thunkMiddleware];
// const mockStore = configureMockStore(middlewares);

describe("redux user test", () => {
	it("returns the initial state by default", () => {
		const testStore = createStore(rootReducer);
		const initialState = testStore.getState();
		testStore.dispatch({ type: "" });
		expect(testStore.getState()).to.equal(initialState);
	});
});
