/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";
import previewView from "./previewView";

class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list"); 

    _errorMessage = "No recipes yet bookmarked. Please select recipe to bookmarked !";
   
   addHandlerRender(handler) {
      window.addEventListener('load', handler);
   }

  /**
   * Generates the markup for the results view.
   * 
   * This method maps over the data and generates a markup preview for each item,
   * then joins them into a single string.
   * 
   * @retxurns {string} The generated markup as a single string.
   */
   _genrateMarkup() {
      return this.data.map(bookmarks => previewView.render(bookmarks,false)).join('');
   }

   
}

export default new BookmarksView();