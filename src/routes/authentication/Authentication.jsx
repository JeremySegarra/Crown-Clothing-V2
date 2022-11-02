import SignupForm from "../../components/sign-up-form/SignupForm";
import SignInForm from "../../components/sign-in-form/SignInForm";

import { AuthenticationContainer } from "./Authentication.Styles.jsx";

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm></SignInForm>
      <SignupForm></SignupForm>
    </AuthenticationContainer>
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
