import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

//since we do not have useReducer gook anymore we need the initial state to be our default state
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  //we want to return a new object with the previous state spread and to override the currentUser
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    default:
      return state;
  }
};
//in redux every reducer gets the same action so if our userReducer does not have the specified type we return its current state in default case
//unlike with useReducer hook which has specific dispatch functions per reducer
