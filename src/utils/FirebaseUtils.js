import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

//firestore governs our database
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

//we can pull in different providers for facebook, github ect.
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); //may need to pass app to getauth check docs

//these may need to be async
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//initialize our db
export const db = getFirestore();

//collection key example is users in our db
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  //we create a collection ref and give it a key such as categories
  const collectionRef = collection(db, collectionKey);

  //in order to write all our objects to our collection in 1 succesful transaction we need to use writeBatch()
  const batch = writeBatch(db); //now we have a batch instance

  objectsToAdd.forEach((object) => {
    //the key is the title
    const docRef = doc(collectionRef, object.title.toLowerCase()); //we can pass this our collectionRef because colRef knows which db its from already

    batch.set(docRef, object); //so we can set this location i.e docRef with the value of object
  });

  //this commit() fires off the transaction
  await batch.commit();
  console.log("Done");
};

export const getCategoriesAndDocuments = async () => {
  //first we need the collection ref
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);

  //allows us to throw and error to see our failed state when fetching categories
  // await Promise.reject(new Error("new error woops"));

  //allows us to fetch the document snapshots
  const querySnapshot = await getDocs(q);

  //this will give us back the categories as an array
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
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
      //displayname will be overwritten by spreading the additional info into the object sometimes we have it sometimes we may not
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

//auth tells signout which user to find
export const signOutUser = async () => await signOut(auth);

//whenever this auth state changes, we call the callback function, when we instantiate this function we callback
//Note: getAuth() has been keeping track of the different sign in features we have been calling and it persists this between refresh

export const onAuthStateChangedListener = (callback) =>
  //whenever auth changes, callback function will run
  //this is a permenatly open listener always listening to changes
  //we need to tell it to stop listening when the usercontext component unmounts, memory leak
  onAuthStateChanged(auth, callback);

//****** Getting our Categories Map before redux busniess logic migration too selector ******/

// export const getCategoriesAndDocuments = async () => {
//first we need the collection ref
//   const collectionRef = collection(db, "categories");

//   const q = query(collectionRef);

//allows us to fetch the document snapshots
//   const querySnapshot = await getDocs(q);
//   console.log("this is the querySnapshot: ", querySnapshot);

//querySnapshot.docs returns us an array of all the documents in the querySnapshot
//we can use reduce in order to create the finished structure of this object
//SIDE NOTE: this works because we already added the data in our batch function so acc[title.toLowerCase()] = items
//   console.log("about to enter querySnapshot.docs.reduce");

//   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
//     console.log("this is acc: ", acc);
//     console.log("this is docSnapshot: ", docSnapshot);
//     const { title, items } = docSnapshot.data();
//     console.log("this is docSnapshot.data(): ", docSnapshot.data());

//acc[title.toLowerCase()] = items; is saying at the Hats key set its value to items which is an array of items
//we need to lower case because our key our collection key in the DB is lowercase and the title in the document object is uppercase
//
//     KEY :  VALUE
//     hats: set value to [{}, {}, {}]
//     hats: [{}, {}, {}]
//
//     acc[title.toLowerCase()] = items;
//     console.log("this is acc after acc[title.toLowerCase()] = items; ", acc);
//     return acc;
//   }, {});

//   console.log("this is our completed category map after reduce: ", categoryMap);
//   return categoryMap;
// };

// Structure of categories collection
/* 
hats: {
  title: 'hats',
  items: [{}, {}, {}]
}
*/
