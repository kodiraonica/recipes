import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const imageInput = document.getElementById('image');
const editRecipeForm = document.getElementById('edit-recipe-form');

const getRecipeById = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (!recipeId) {
      window.location.replace('/');
      return;
    }
  
    const recipeRef = doc(firestore, 'recipes', recipeId);
    const recipe = await getDoc(recipeRef);
    if (!recipe.exists()) {
      return;
    }
  
    populateRecipeContent(recipe);
};

const populateRecipeContent = (recipe) => {
    const recipeData = recipe.data();
    titleInput.value = recipeData.title;
    descriptionInput.value = recipeData.description;
    categoryInput.value = recipeData.category;
    imageInput.value = recipeData.image;
}

const updateRecipe = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (!recipeId) {
      window.location.replace('/');
      return;
    }
  
    const recipeRef = doc(firestore, 'recipes', recipeId);
    try {
        await updateDoc(recipeRef, {
            title: titleInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
            image: imageInput.value
        });
    }
    catch (err) {
        console.log(err);
    }

    window.location.href = `/recept.html?id=${recipeId}`;
}

editRecipeForm.addEventListener('submit', updateRecipe);
window.addEventListener('DOMContentLoaded', getRecipeById);