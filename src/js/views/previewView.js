/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";
import icons from 'url:../../img/icons.svg';
class PreviewView extends View {
  _parentElement = '';

  // _errorMessage = "No recipes yet bookmarked. Please select recipe to bookmarked !";

  /**
   * Generates the markup for the results view.
   * 
   * This method maps over the data and generates a markup preview for each item,
   * then joins them into a single string.
   * 
   * @retxurns {string} The generated markup as a single string.
   */
  _genrateMarkup() {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
      <a class="preview__link ${this.data.id === id ? 'preview__link--active' : ''} " href="#${this.data.id}">
        <figure class="preview__fig">
          <img src="${this.data.imageurl}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${this.data.title}</h4>
          <p class="preview__publisher">${this.data.publisher}</p>
        
         <div class="preview__user-generated ${this.data.key ? '' : 'hidden'}">
           <svg>
            <use href="${icons}#icon-user"></use>
           </svg>
         </div>
        </div>
      </a>
    </li>`;
  }

}

export default new PreviewView();