import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/FirebaseUtils";

import Home from "./routes/home/Home";
import Navigation from "./routes/navigation/Navigation";
import Authentication from "./routes/authentication/Authentication";
import Shop from "./routes/shop/Shop";
import Checkout from "./routes/checkout/Checkout";

import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //use effect will only run on mount
    //this takes the callback function that runs whenever our auth state changes

    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log("this is user in onAuthStateChangeListener function: ", user);

      if (user) {
        createUserDocumentFromAuth(user); //this may need to be async returns a Promise
      }

      //if a user signed out user will be null, otherwise it is the user object
      dispatch(setCurrentUser(user));
    });

    //with use effect whatever we return will run when this component unmounts
    return unsubscribe;

    //the useEffect hook does not know that dispatch will never change by reference so we just have to put it as a dependency
    //we do not need to do this, in reality dispatch never changes so this is the same as []
  }, []);

  //for shop we have nested routes if we use ship/* is a wildcard that expects further routes
  //Shop component has routes set up as well for children routes
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="auth" element={<Authentication />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
