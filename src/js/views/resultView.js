/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";

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
      return this.data.map(this._genrateMarkupPreview).join('');
   }

  /**
   * Generates the HTML markup for a preview of a result.
   *
   * @param {Object} result - The result object containing data for the preview.
   * @param {string} result.id - The unique identifier for the result.
   * @param {string} result.imageurl - The URL of the image for the result.
   * @param {string} result.title - The title of the result.
   * @param {string} result.publisher - The publisher of the result.
   * @returns {string} The HTML markup string for the result preview.
   * @private
   */
   _genrateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
      return `<li class="preview">
      <a class="preview__link ${result.id === id ?'preview__link--active' : ''} " href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.imageurl}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publisher}</p>
        </div>
      </a>
    </li>`;
   }
   
}

export default new ResultView();