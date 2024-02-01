
const searchForm = document.getElementById('search-recipes-form');
const searchInput = document.getElementById('search-input');


const onSearch = (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('search', "");
  urlParams.set('search', searchValue);
  
  window.location.search = urlParams;
};

document.addEventListener('DOMContentLoaded', () => {
  searchForm.addEventListener('submit', onSearch);
});
