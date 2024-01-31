// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV5i97GsT1ygsc2HIQ9GyfRMnGlwD_qTc",
  authDomain: "recipes-28c3d.firebaseapp.com",
  projectId: "recipes-28c3d",
  storageBucket: "recipes-28c3d.appspot.com",
  messagingSenderId: "965365013625",
  appId: "1:965365013625:web:c41e6998d8b177e22448a8",
  measurementId: "G-0K7FJ7LL3Q"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);