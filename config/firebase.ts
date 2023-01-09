// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfib3VrU22-3vwqFa77Ax2UE6slEfl-nY",
  authDomain: "box-chat-b72ac.firebaseapp.com",
  projectId: "box-chat-b72ac",
  storageBucket: "box-chat-b72ac.appspot.com",
  messagingSenderId: "546526367412",
  appId: "1:546526367412:web:0daef1ffa7e11833afd1e1",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
