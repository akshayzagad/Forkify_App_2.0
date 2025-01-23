import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

const recipeContainer = document.querySelector(".recipe");

const controlRecipe = async function () {
  try {
    /* Get id when click on hasmap using load hasmap event on window  */
    const id = window.location.hash.slice(1);
    if (!id) return;

    /* Loading Recipe */
    await model.loadRecipe(id);

    /* Get import inisilize empty object in controller to use in markup */
    let { recipe } = model.state;
    console.log(recipe);

    /*  Rendering spinner when load the recipe */
    recipeView.renderSpinner();

    /* Update Bookmark when we click any recipe in bookmark View */
    bookmarksView.update(model.state.bookmarks);

    /* Update Result View to mark selected search result */
    resultView.update(model.getSearchResultsPage());

    /* Here we get data from model by object state which is initiallize above code */
    recipeView.render(model.state.recipe);

    /* Here We use same method to initilize constructor in recipeView */
    //let recipeView = new recipeView(model.state.recipe);

  } catch (err) {
    recipeView.handlingError(err);
    console.error(err);

  }
};

const ControlSearchResults = async function () {
  try {
    /* Render Spinner */
    resultView.renderSpinner();

    /* Get search query from search view and Store it */
    let query = searchView.getQuery();
    if (!query) return;

    /* store query pass in Api and get data */
    await model.loadSearchResult(query);

    /* Render Preview passing data into Parent class View which come from above api */
    // resultView.render(model.state.searchs.results);

    resultView.render(model.getSearchResultsPage());

    /* Render initial Pagination button */
    paginationView.render(model.state.searchs);



  } catch (error) {
    console.error(error);
  }
};

/**
 * Controls the pagination of search results.
 *
 * @param {number} gotoPage - The page number to navigate to.
 */
const ControlPagination = function (gotoPage) {
  // Render new results
  resultView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.searchs);
};

const controlServings = function (newServings) {
  // Update a serving numbers 
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  // Add or Delete Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // Update Recipe View In which we pass the model state recipe bookmarked property
  recipeView.update(model.state.recipe);

  // Render Bookmark
  bookmarksView.render(model.state.bookmarks);
}

const controlBookMark = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // console.log(newRecipe);

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    // console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    
  } catch (err) {
    console.error(err);
    addRecipeView.handlingError(err);
  }
}

/**
 * Initializes the application by setting up event handlers.
 * 
 * This function subscribes to various events by calling the following handler functions:
 * - `recipeView.addHandlerRender(controlRecipe)`: Sets up the handler for rendering recipes.
 * - `searchView.addHandlerSearch(ControlSearchResults)`: Sets up the handler for searching recipes.
 * - `paginationView.addHandlerClick(ControlPagination)`: Sets up the handler for pagination clicks.
 */
function init() {
  /** Subskriber Function :- calling addHandlerRender function in recipeView */
  bookmarksView.addHandlerRender(controlBookMark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandleraddBookmarked(controlAddBookmark);
  searchView.addHandlerSearch(ControlSearchResults);
  paginationView.addHandlerClick(ControlPagination);
  addRecipeView.addHandlerShowWindow();
  addRecipeView.addHandlerHideWindow();
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();
