// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiXnMlnLO-lriQyenrQQrfVumJNotSdno",
  authDomain: "tunder-be387.firebaseapp.com",
  databaseURL: "https://tunder-be387-default-rtdb.firebaseio.com",
  projectId: "tunder-be387",
  storageBucket: "tunder-be387.appspot.com",
  messagingSenderId: "793204212397",
  appId: "1:793204212397:web:1ca571e768a17548ffbc24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export {auth , db , app}