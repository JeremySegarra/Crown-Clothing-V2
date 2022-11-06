//This is how we can write our own middleware functions (CURRYING A FUNCTION)
//NOTE: This function specifically shows in a syncronous way how our render cycle looks with useSelector()
export const loggerMiddleWare = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("Current state: ", store.getState());

  next(action);

  console.log("Next State: ", store.getState());
};
