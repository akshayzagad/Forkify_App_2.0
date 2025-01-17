/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";
import previewView from "./previewView";

class ResultView extends View {
   _parentElement = document.querySelector(".results"); 

    _errorMessage = "No recipes found for your query. Please try again!";
    
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

export default new ResultView();