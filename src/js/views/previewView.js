/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";
import icons from 'url:../../img/icons.svg';

/**
 * PreviewView class handles the rendering of individual recipe previews.
 * It extends the View class.
 */
class PreviewView extends View {
  _parentElement = '';

  /**
   * Generates the markup for the preview view.
   * 
   * This method constructs the HTML structure for displaying a preview of a recipe,
   * including the recipe image, title, publisher, and user-generated icon.
   * It uses the data stored in the `this.data` object to populate the content.
   * 
   * @returns {string} The HTML markup for the preview view.
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