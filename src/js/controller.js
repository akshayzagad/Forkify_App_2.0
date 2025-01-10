
import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";

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

    /* Update Result View to mark selected search result */
    resultView.update(model.getSearchResultsPage());

    /* Here we get data from model by object state which is initiallize above code */
    recipeView.render(model.state.recipe);

    /* Here We use same method to initilize constructor in recipeView */
    //let recipeView = new recipeView(model.state.recipe);

  } catch (err) {
    recipeView.handlingError(err);
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
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(ControlSearchResults);
  paginationView.addHandlerClick(ControlPagination);

}

init();
