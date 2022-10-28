import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
//Allows us to make CRUD actions to our DB
const firebaseConfig = {
  apiKey: "AIzaSyDOWAcUBKj6QB0Z1m-oLjHR_ay9u4NQU8s",
  authDomain: "crown-clothing-db-v2.firebaseapp.com",
  projectId: "crown-clothing-db-v2",
  storageBucket: "crown-clothing-db-v2.appspot.com",
  messagingSenderId: "735116031075",
  appId: "1:735116031075:web:4d43ad44e1f792a50c3456",
};

// Initialize Firebase
//CRUD is (Create, Read, Update, Delete) from DB
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //may need to pass app to getauth check docs
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//initialize our db
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  //check if there is an exisiting document reference
  //give me the document ref inside this db, under users colletion, with this users auth uid
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(
    "google creates this obj to know where we can set data: ",
    userDocRef
  );

  const userSnapshot = await getDoc(userDocRef);

  console.log("this is users document snapshot: ", userSnapshot);
  console.log(userSnapshot.exists());

  //check if the user data exists, if it does return the userDocRef
  //if user data does not exist, then create / set doc with data from userAuth in my collection with userSnapshot

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};
