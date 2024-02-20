// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaoB6bipxHs_7n-sYfecMyPoah2iQGQ-I",
  authDomain: "qrifyme-e45a9.firebaseapp.com",
  projectId: "qrifyme-e45a9",
  storageBucket: "qrifyme-e45a9.appspot.com",
  messagingSenderId: "428208076985",
  appId: "1:428208076985:web:e52ee02659304211c38368",
  measurementId: "G-MYVXW3MXME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider;