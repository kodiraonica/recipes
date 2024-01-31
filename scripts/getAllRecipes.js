import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

const mainContainer = document.getElementById('main-container');
let userId = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId = user.uid;
    return;
  } 

  userId = null;
});

const recipesContainer = document.getElementById('recipes');
const getAllRecipes = async (db) => {
  const recipes = await getDocs(collection(db, 'recipes'));
  const recipesList = recipes.docs.map((recipe) => {
    return {
      id: recipe.id,
      ...recipe.data()
    };
  });
 
  if (recipesList.length) {
   return createRecipesContent(recipesList);
  }

  recordsNotFound();
  
};

const recordsNotFound = () => {
  const noRecords = document.createElement('div');
  noRecords.classList.add('no-records');
  noRecords.innerHTML = `
    <h2> ¯&#92;_(ツ)_/¯</h2>
    <p>You do not have any recipes yet.</p>
  `;
  mainContainer.appendChild(noRecords);
}

const createRecipesContent = (recipes) => {
  recipes.forEach((recipe) => {
    const recipeActionButtons = showActionButtons(recipe.userId, recipe.id);
    const recipeCard = document.createElement('div');
    recipeCard.addEventListener('click', () => {
      window.location.href = `/recept.html?id=${recipe.id}`;
    });
    
    recipeCard.classList.add('recipe');
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h2>${recipe.title}</h2>
      <p>${recipe.description.substring(0, 100)}</p>
      <div class="tags">
        <button>${recipe.category}</button>
      </div>
    `;
    if (recipeActionButtons) {
      recipeCard.innerHTML += recipeActionButtons;
    }

    recipesContainer.appendChild(recipeCard);
  });
}


const showActionButtons = (id, recipeId) => {
 if (userId === id) {
   return `
     <div class="action-buttons justify-content-start">
      <a style="margin-right: 10px" href="/edit.html?id=${recipeId}">Izmijeni</a>
     </div>
   `;
 }

 return null;
};

document.addEventListener('DOMContentLoaded', getAllRecipes(firestore));
