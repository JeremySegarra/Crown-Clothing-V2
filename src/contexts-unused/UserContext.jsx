/******* REACT REDUCERS  *******/

import { createContext, useEffect, useReducer } from "react";

import { createAction } from "../utils/reducer/reducerUtils";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/FirebaseUtils";

//the actual value i want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  console.log("dispatched");
  console.log("Action: ", action);
  //we want to return a new object with the previous state spread and to override the currentUser
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };

    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //useReducer hook always takes our reducer and an Initial state, and gives back to us a state and dispatch function which passes our reducer an action
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  //now we can destructure off currentUser from our state
  //NOTE: can also just destructure state right on our useReducer hook
  const { currentUser } = state;

  console.log("current user in Reducers: ", currentUser);

  //This function is to set the current user by calling dispatch to send our reducer the action
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    //use effect will only run on mount
    //this takes the callback function that runs whenever our auth state changes

    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("this is user in onAuthStateChangeListener function: ", user);

      if (user) {
        createUserDocumentFromAuth(user); //this may need to be async returns a Promise
      }

      //if a user signed out user will be null, otherwise it is the user object
      setCurrentUser(user);
    });

    //with use effect whatever we return will run when this component unmounts
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/******* REACT CONTEXT  *******/

// import { createContext, useState, useEffect } from "react";

// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from "../utils/FirebaseUtils";

// //the actual value i want to access
// export const UserContext = createContext({
//   currentUser: null,
//   setCurrentUser: () => null,
// });

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const value = { currentUser, setCurrentUser };

//   useEffect(() => {
//     //use effect will only run on mount
//     //this takes the callback function that runs whenever our auth state changes

//     const unsubscribe = onAuthStateChangedListener((user) => {
//       console.log("this is user in onAuthStateChangeListener function: ", user);

//       if (user) {
//         createUserDocumentFromAuth(user); //this may need to be async returns a Promise
//       }

//       //if a user signed out user will be null, otherwise it is the user object
//       setCurrentUser(user);
//     });

//     //with use effect whatever we return will run when this component unmounts
//     return unsubscribe;
//   }, []);

//   return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
