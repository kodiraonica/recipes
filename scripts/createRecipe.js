import { collection, addDoc } from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from './firebase.js';

const newRecipeForm = document.getElementById('new-recipe-form');
let userId = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('user is logged in');
    userId = user.uid;
  } else {
    console.log('user is not logged in');
    userId = null;
  }
});

const createNewRecipe = async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const image = document.getElementById('image').value;
  const recipe = {
    title,
    description,
    category,
    image,
    userId,
  };

  try {
    const docRef = await addDoc(collection(firestore, 'recipes'), recipe);
    console.log('Document written with ID: ', docRef.id);
    window.location.href = '/';
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

newRecipeForm.addEventListener('submit', createNewRecipe);
