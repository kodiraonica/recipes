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
export const getAllRecipes = async (db) => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchValue = urlParams.get('search');
  const getDocsRecipes = getDocs(collection(db, 'recipes'))
    .then((recipes) => {
      let recipesList = [];
      loader.remove();

      if (searchValue) {
        recipes.docs.map((recipe) => {
          const recipeData = recipe.data();
          const recipeTitle = recipeData.title.toLowerCase();
          const recipeDescription = recipeData.description.toLowerCase();
          const recipeCategory = recipeData.category.toLowerCase();

          if (
            recipeTitle.includes(searchValue) ||
            recipeDescription.includes(searchValue) ||
            recipeCategory.includes(searchValue)
          ) {
            return recipesList.push({
              id: recipe.id,
              ...recipe.data(),
            });
          }
        });

        createRecipePaginationAndContent(recipesList);
        return recipesList;
      }

      recipes.docs.map((recipe) => {
        return recipesList.push({
          id: recipe.id,
          ...recipe.data(),
        });
      });

      createRecipePaginationAndContent(recipesList);

      return recipesList;
    })
    .catch((error) => {
      const recipesList = [];
      console.log('Error getting documents: ', error);
      return recipesList;
    });

  const recipesList = await getDocsRecipes;
  return recipesList;
};

export const createRecipePaginationAndContent = (recipesList) => {
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
};

const recordsNotFound = () => {
  const noRecords = document.createElement('div');
  noRecords.classList.add('no-records');
  noRecords.innerHTML = `
    <h2> ¯&#92;_(ツ)_/¯</h2>
    <p>Nema ničega.</p>
  `;
  mainContainer.appendChild(noRecords);
};

const createRecipesContent = (recipes) => {
  const previousRecipes = document.querySelectorAll('.recipe');
  previousRecipes.forEach((recipe) => recipe.remove());

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
