import {
  // auth,
  signInWithGooglePopup,
  // signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/FirebaseUtils";

import SignupForm from "../../components/sign-up-form/SignupForm";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // console.log(response);
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <SignupForm></SignupForm>
    </div>
  );
};

export default SignIn;

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
