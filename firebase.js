// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSQz-zjKITwuby_Nd7WA66i_r92QnLp0g",
  authDomain: "tinder-by-op.firebaseapp.com",
  projectId: "tinder-by-op",
  storageBucket: "tinder-by-op.appspot.com",
  messagingSenderId: "873883295445",
  appId: "1:873883295445:web:8df5e37dea97c771a3cc5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export {auth , db}