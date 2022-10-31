import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/FirebaseUtils";

//the actual value i want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
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
