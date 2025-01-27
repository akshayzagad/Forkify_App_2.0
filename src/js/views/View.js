import icons from "url:../../img/icons.svg";

export default class View {
  /**
   * Renders the provided data to the DOM.
   * 
   * @param {Object|Array} data - The data to render.
   * @param {boolean} [render=true] - Whether to render the data or return the markup.
   * @returns {string|undefined} The generated markup if render is false.
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;

    const markup = this._genrateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Updates the DOM elements based on the provided data.
   * 
   * @param {Object} data - The data to update the view with.
   * @this {Object} - The instance of the view class.
   */
  update(data) {
    this.data = data;
    const newMarkup = this._genrateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElements = Array.from(this._parentElement.querySelectorAll("*"));

    newElements.forEach((newElements, i) => {
      const curEl = currentElements[i];

      if (!newElements.isEqualNode(curEl) && newElements.firstChild?.nodeValue.trim() != '') {
        curEl.textContent = newElements.textContent;
      }

      if (!newElements.isEqualNode(curEl)) {
        Array.from(newElements.attributes).forEach(attributes => curEl.setAttribute(attributes.name, attributes.value))
      }
    });
  }

  /**
   * Clears the parent element's content.
   */
  _clear() {
    this._parentElement.innerHTML = "";
  }

  /**
   * Renders a loading spinner to the DOM.
   */
  renderSpinner = function () {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div> `;
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  /**
   * Renders an error message to the DOM.
   * 
   * @param {string} [message=this._errorMessage] - The error message to render.
   */
  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>No recipes found for your query. Please try again!</p>
                <p>${message}</p>
              </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a success message to the DOM.
   * 
   * @param {string} [message=this._message] - The success message to render.
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

