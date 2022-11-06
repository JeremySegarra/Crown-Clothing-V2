import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import { loggerMiddleWare } from "./middleware/logger";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

//root means to persist the whole thing
//storage means it will use local storage
//user is already being persisted with our auth listener for firebase so we blacklist this in persistConfig
const persistConfig = {
  key: "root",
  storage,
  // blacklist: ["user"],
  whitelist: ["cart"],
};

//now instead of using rootReducer in createStore we can use our persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

//root reducer a combination of all of our reducers

//middlewares run before an action hits the reducers, so when we dispatch an action it hits the middleware first
//if we are in development this will filter anything with falsyness because we do not want to pass false into createStore so we get an empty array [] instead of false
//can also put "development" as value to test this logger

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  thunk,
].filter(Boolean);

//This allows us to use redux dev tools
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

//this will pass every middleware we initialize
//middlewares enhance our store meaning since they actions hit them before the reducers change the state
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

//Now in index.js we can import this and pass it to the imported <PersistGate persistor={persistor} /> component
export const persistor = persistStore(store);

//CURRYING A FUNCTION: is a function that returns you back another function
//******** EXAMPLE *************/
/*
const curryFunction = (a) => (b, c) => {
  a + b - c
}

const withA = curryFunction(3);

withA(2, 4); = 3 + 2 - 4

*/
