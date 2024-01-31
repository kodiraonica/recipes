import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase.js";

const isUserLoggedIn = ( ) => {
   onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('user is logged in');
        } else {
            console.log('user is not logged in');
            window.location.href = '/';
        }
    }
    );
}

window.addEventListener('DOMContentLoaded', isUserLoggedIn);