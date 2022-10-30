import SignupForm from "../../components/sign-up-form/SignupForm";
import SignInForm from "../../components/sign-in-form/SignInForm";

import "./Authentication.Styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm></SignInForm>
      <SignupForm></SignupForm>
    </div>
  );
};

export default Authentication;

//ASYNC USE EFFECT

// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

// useEffect(() => {
//   async function response() {
//     const result = await getRedirectResult(auth);

//     if (result) {
//       const userDocRef = await createUserDocumentFromAuth(result.user);
//     }

//     console.log(result);
//   }

//   response();
// }, []);
