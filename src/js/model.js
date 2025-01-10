/**
 * State object to store recipe and search results.
 * @typedef {Object} State
 * @property {Object} recipe - The current recipe details.
 * @property {Object} searchs - The search results and query details.
 * @property {string} searchs.query - The search query string.
 * @property {Array<Object>} searchs.results - The search results array.
 * @property {number} searchs.page - The current search results page.
 * @property {number} searchs.resultsPerPage - The number of results per page.
 */

/**
 * Loads a recipe by its ID and updates the state.
 * @async
 * @param {string} id - The ID of the recipe to load.
 * @throws Will throw an error if the recipe cannot be loaded.
 */

/**
 * Loads search results based on a query and updates the state.
 * @async
 * @param {string} query - The search query string.
 * @throws Will throw an error if the search results cannot be loaded.
 */

/**
 * Gets search results for a specific page.
 * @param {number} [page=state.searchs.page] - The page number to get results for.
 * @returns {Array<Object>} The search results for the specified page.
 */
import { API_URL, RES_PER_PAGE } from "./config";
import { getJson } from "./helpers";

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
    }
};

export const loadRecipe = async function (id) {
    try {
        //Recipe Api
        const responseData = await getJson(`${API_URL}${id}`);

        /**
         * Destructures the recipe object from the response data.
         * 
         * @param {Object} responseData - The response data from the API.
         * @param {Object} responseData.data - The data object containing the recipe.
         * @param {Object} responseData.data.recipe - The recipe object.
         */
        let { recipe } = responseData.data;
        state.recipe =
        {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageurl: recipe.image_url,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceurl: recipe.source_url,
            title: recipe.title,
            ingredients: recipe.ingredients,
        };
        // console.log(state.recipe.servings);
    } catch (err) {
        // console.error(`${err} It is a error`);
        throw err;
    }
}

/**
 * Loads search results based on the provided query.
 * 
 * This function fetches data from the Recipe API using the provided query,
 * processes the data to extract relevant recipe information, and updates
 * the state with the search results.
 * 
 * @param {string} query - The search query to fetch recipes for.
 * @returns {Promise<void>} A promise that resolves when the search results are loaded.
 * @throws Will log an error to the console if the fetch operation fails.
 */
export const loadSearchResult = async function (query) {
    try {
        //Recipe Api
        const data = await getJson(`${API_URL}?search=${query}`);
        // console.log(data);

        state.searchs.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                imageurl: recipe.image_url,
                publisher: recipe.publisher,
                title: recipe.title,
            }
        });
        console.log(state.searchs.results);

    } catch (error) {
        console.error(error);
    }
}

/**
     * Calculates the ending index for pagination based on the current page and results per page.
     * 
     * @constant {number} endWith - The ending index for the current page.
     * @param {number} page - The current page number.
     * @param {Object} state - The state object containing search results.
     * @param {Object} state.searchs - The search results object.
     * @param {number} state.searchs.resultsPerPage - The number of results per page.
     */

export const getSearchResultsPage = function (page = state.searchs.page) {
    state.searchs.page = page;
    const startWith = (page - 1) * state.searchs.resultsPerPage;
    const endWith = page * state.searchs.resultsPerPage;
    console.log(startWith, endWith);

    return state.searchs.results.slice(startWith, endWith);
}

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
 

