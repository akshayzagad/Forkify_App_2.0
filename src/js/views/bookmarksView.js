/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";
import previewView from "./previewView";

/**
 * BookmarksView class handles the rendering of bookmarked recipes.
 * It extends the View class.
 */
class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list"); 

    _errorMessage = "No recipes yet bookmarked. Please select recipe to bookmarked !";
   
   /**
    * Adds an event handler to render the bookmarks.
    * 
    * @param {Function} handler - The handler function to call on page load.
    */
   addHandlerRender(handler) {
      window.addEventListener('load', handler);
   }

  /**
   * Generates the markup for the bookmarks view.
   * 
   * This method maps over the data and generates a markup preview for each bookmarked recipe,
   * then joins them into a single string.
   * 
   * @returns {string} The generated markup as a single string.
   */
   _genrateMarkup() {
      return this.data.map(bookmarks => previewView.render(bookmarks,false)).join('');
   }

   
}

export default new BookmarksView();