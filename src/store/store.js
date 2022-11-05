import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//This is how we can write our own middleware functions (CURRYING A FUNCTION)
//NOTE: This function specifically shows in a syncronous way how our render cycle looks with useSelector()
const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("Current state: ", store.getState());

  next(action);

  console.log("Next State: ", store.getState());
};

//root reducer a combination of all of our reducers

//middlewares run before an action hits the reducers, so when we dispatch an action it hits the middleware first
const middleWares = [loggerMiddleWare];

//this will pass every middleware we initialize
//middlewares enhance our store meaning since they actions hit them before the reducers change the state
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

//CURRYING A FUNCTION: is a function that returns you back another function
//******** EXAMPLE *************/
/*
const curryFunction = (a) => (b, c) => {
  a + b - c
}

const withA = curryFunction(3);

withA(2, 4); = 3 + 2 - 4

*/
