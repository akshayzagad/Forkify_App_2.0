import { API_URL, RES_PER_PAGE, KEY } from "./config";
import { AJAX } from "./helpers";

/**
 * The state object holds the application's state data.
 * 
 * @property {Object} recipe - The current recipe data.
 * @property {Object} searchs - The search-related state data.
 * @property {string} searchs.query - The search query string.
 * @property {Array} searchs.results - The search results array.
 * @property {number} searchs.page - The current search results page.
 * @property {number} searchs.resultsPerPage - The number of results per page.
 */
export const state = {
  recipe: {},
  searchs: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

/**
 * Creates a recipe object from the provided data.
 * 
 * @param {Object} data - The data to create the recipe object from.
 * @returns {Object} The created recipe object.
 */
const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    imageurl: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceurl: recipe.source_url,
    title: recipe.title,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
}

/**
 * Loads a recipe by its ID and updates the state.
 * 
 * @param {string} id - The ID of the recipe to load.
 * @returns {Promise<void>} A promise that resolves when the recipe is loaded.
 * @throws Will throw an error if the recipe cannot be loaded.
 */
export const loadRecipe = async function (id) {
  try {
    const responseData = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(responseData);

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else
      state.recipe.bookmarked = false;

  } catch (err) {
    throw err;
  }
}

/**
 * Loads search results based on the provided query.
 * 
 * @param {string} query - The search query to fetch recipes for.
 * @returns {Promise<void>} A promise that resolves when the search results are loaded.
 * @throws Will log an error to the console if the fetch operation fails.
 */
export const loadSearchResult = async function (query) {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    state.searchs.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        imageurl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      }
    });
    state.searchs.page = 1;

  } catch (error) {
    console.error(error);
  }
}

/**
 * Gets search results for a specific page.
 * 
 * @param {number} [page=state.searchs.page] - The page number to get results for.
 * @returns {Array<Object>} The search results for the specified page.
 */
export const getSearchResultsPage = function (page = state.searchs.page) {
  state.searchs.page = page;
  const startWith = (page - 1) * state.searchs.resultsPerPage;
  const endWith = page * state.searchs.resultsPerPage;
  return state.searchs.results.slice(startWith, endWith);
}

/**
 * Updates the servings for the current recipe.
 * 
 * @param {number} newServings - The new number of servings.
 */
export const updateServings = function (newServings) {
  if (!state.recipe.ingredients || !state.recipe.servings) {
    console.error('No ingredients or servings found in the recipe.');
    return;
  }

  if (newServings <= 0) {
    console.error('Servings must be greater than 0.');
    return;
  }

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

/**
 * Persists the bookmarks to local storage.
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks))
}

/**
 * Adds a recipe to the bookmarks.
 * 
 * @param {Object} recipe - The recipe to add to the bookmarks.
 */
export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
}

/**
 * Deletes a recipe from the bookmarks.
 * 
 * @param {string} id - The ID of the recipe to delete from the bookmarks.
 */
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  if (index !== -1) state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
}

/**
 * Uploads a new recipe and updates the state.
 * 
 * @param {Object} newRecipe - The new recipe data.
 * @returns {Promise<void>} A promise that resolves when the recipe is uploaded.
 * @throws Will throw an error if the recipe cannot be uploaded.
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe).filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '').map(ing => {
      const ingArr = ing[1].split(',').map(el => el.trim());
      if (ingArr.length !== 3) {
        throw new Error('Wrong ingredient format! Please use the correct format :)');
      }
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    }

    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
}

/**
 * Initializes the application by loading bookmarks from local storage.
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
}
init();


