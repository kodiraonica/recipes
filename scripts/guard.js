import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebase.js";
const newRecipeButton = document.getElementById('new-recipe-button');
const isRootRoute = window.location.pathname === '/' || window.location.pathname === '/index.html';
const isProtectedRoute = window.location.pathname === '/new.html';

const checkUser = (authCallback, nonAuthCallback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('user is logged in');
      authCallback()
    } else {
      console.log('user is not logged in');
      nonAuthCallback()
    }
  });
}

const showButton = () => {
  newRecipeButton.style.display = 'inline';
}

const hideButton = () => {
  newRecipeButton.style.display = 'none';
}

const reidrectToRootRoute = () => {
  window.location.href = '/';
}

if (isRootRoute) {
  checkUser(showButton, hideButton);
}

if (isProtectedRoute) {
  checkUser(() => {}, reidrectToRootRoute);
}