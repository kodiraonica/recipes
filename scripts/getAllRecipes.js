import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase.js';

const mainContainer = document.getElementById('main-container');
const loader = document.getElementById('loader');

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
  getDocs(collection(db, 'recipes')).then((recipes) => {
    loader.remove();

    const recipesList = recipes.docs.map((recipe) => {
      return {
        id: recipe.id,
        ...recipe.data(),
      };
    });

    if (recipesList.length > 6) {
      const { start, end, page } = initializePagination();

      if (recipesList.length < end) {
        const pagination = document.getElementById('recipes-pagination');
        pagination.innerHTML = `
        <a href="/?page=${page - 1}">Prethodna</a>
      `;
      }

      if (page === 1) {
        const pagination = document.getElementById('recipes-pagination');
        pagination.innerHTML = `
        <a href="/?page=${page + 1}">Sljedeća</a>
      `;
      }
      return createRecipesContent(recipesList.slice(start, end));
    }

    if (recipesList.length) {
      return createRecipesContent(recipesList);
    }

    recordsNotFound();
  }).catch((error) => {
    console.log('Error getting documents: ', error);
  })
};

const recordsNotFound = () => {
  const noRecords = document.createElement('div');
  noRecords.classList.add('no-records');
  noRecords.innerHTML = `
    <h2> ¯&#92;_(ツ)_/¯</h2>
    <p>Nemaš nijedan recept.</p>
  `;
  mainContainer.appendChild(noRecords);
};

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
};

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

const initializePagination = () => {
  const pagination = document.getElementById('recipes-pagination');
  const page = +new URLSearchParams(window.location.search).get('page') || 1;
  const limit = 6;
  const start = (page - 1) * limit;
  const end = page * limit;

  pagination.innerHTML = `
    <a href="/?page=${page - 1}">Prethodna</a>
    <a href="/?page=${page + 1}">Sljedeća</a>
  `;

  return { start, end, page };
};

document.addEventListener('DOMContentLoaded', () => {
  getAllRecipes(firestore);
});
