// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkdue408vWDYaC6xhdOk5GJUeJoubSmuE",
  authDomain: "nethub-356011.firebaseapp.com",
  projectId: "nethub-356011",
  storageBucket: "nethub-356011.appspot.com",
  messagingSenderId: "336236854992",
  appId: "1:336236854992:web:9661da472a0648aae0a8d5",
  measurementId: "G-C4C74BQFC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const auth = getAuth()
