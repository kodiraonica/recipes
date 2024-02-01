import { getDoc, doc } from 'firebase/firestore';
import { firestore } from './firebase';

const recipeRootElement = document.getElementById('recipe-root');
const loader = document.getElementById('loader');

const createRecipeImage = (recipeData) => {
  const recipeElement = document.createElement('div');
  recipeElement.classList.add('card');
  recipeElement.innerHTML = `
    <img
    src=${recipeData.image}
    alt=${recipeData.title}
    />
    <h2>${recipeData.title}</h2>
  `;

  return recipeElement;
};

const createRecipeDescription = (recipeData) => {
  const recipeDescriptionElement = document.createElement('div');
  recipeDescriptionElement.classList.add('recipe-description');
  recipeDescriptionElement.innerHTML = `  <div class="card">
    <h2> Priprema </h2>
    <div class="recipe-description"
     <p>${recipeData.description}</p>
     </div>`;

  return recipeDescriptionElement;
};

const createRecipeContent = (recipe) => {
  const recipeData = recipe.data();
  const recipeImage = createRecipeImage(recipeData);
  const recipeDescriptionElement = createRecipeDescription(recipeData);

  recipeRootElement.appendChild(recipeImage);
  recipeRootElement.appendChild(recipeDescriptionElement);
};

const getRecipeById = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');
  if (!recipeId) {
    window.location.replace('/');
    return;
  }

  const recipeRef = doc(firestore, 'recipes', recipeId);
  getDoc(recipeRef)
    .then((recipe) => {
      loader.remove();
      if (!recipe.exists()) {
        return;
      }

      createRecipeContent(recipe);
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};

window.addEventListener('DOMContentLoaded', getRecipeById);
