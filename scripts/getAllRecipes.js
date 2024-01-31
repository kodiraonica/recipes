import { getDocs, collection } from 'firebase/firestore';
import { firestore } from './firebase';

const recipesContainer = document.getElementById('recipes');
const getAllRecipes = async (db) => {
  const recipes = await getDocs(collection(db, 'recipes'));
  const recipesList = recipes.docs.map((doc) => doc.data());

  recipesList.forEach((recipe) => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe');
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h2>${recipe.title}</h2>
      <p>${recipe.description}</p>
      <div class="tags">
        <p>${recipe.category}</p>
      </div>
    `;
    recipesContainer.appendChild(recipeCard);
  });
};

document.addEventListener('DOMContentLoaded', getAllRecipes(firestore));
