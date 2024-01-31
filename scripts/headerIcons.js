import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

const createLogoutIcon = () => {
  const logoutIcon = document.getElementById('action-icon');
  logoutIcon.classList.add('material-symbols-outlined');
  logoutIcon.innerHTML = `logout`;
  logoutIcon.addEventListener('click', () => {
    auth.signOut();
  });
};

const createSignInIcon = () => {
  const signInIcon = document.getElementById('action-icon');
  signInIcon.classList.add('material-symbols-outlined');
  signInIcon.innerHTML = `person`;
  signInIcon.addEventListener('click', () => {
    window.location.href = '/login.html';
  });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user is logged in');
    createLogoutIcon();
  } else {
    console.log('user is not logged in');
    createSignInIcon();
  }
});
