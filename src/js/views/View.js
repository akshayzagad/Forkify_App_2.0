import icons from "url:../../img/icons.svg";

export default class View {
  render(data , render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;

    const markup = this._genrateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElement.insertAdjacentHTML("afterbegin", markup);
    
    // console.log(data);
  }

  /**
   * Updates the DOM elements based on the provided data.
   * 
   * @param {Object} data - The data to update the view with.
   * @this {Object} - The instance of the view class.
   * 
   * @description
   * This method updates the DOM elements by comparing the new markup generated from the provided data
   * with the current elements in the parent element. It updates the text content and attributes of the 
   * elements if they have changed.
   * 
   * @example
   * // Assuming `view` is an instance of the View class
   * view.update(newData);
   */
  update(data) {
    this.data = data;
    const newMarkup = this._genrateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const currentElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log(newElements);
    // console.log(currentElements);
 
    newElements.forEach((newElements, i) => {
      const curEl = currentElements[i];
      // console.log(curEl, newElements.isEqualNode(curEl));

      // Update Or Change Element Text
     /** The firstChild property returns the first child node of the specified element. The nodeValue property    returns or sets the value of a node. For text nodes, nodeValue returns the text content.
     * newElements.firstChild returns the first child node of the   newElements element.
     * newElements.firstChild.nodeValue returns the text content of that first child node.
     * trim() removes whitespace from both ends of the string.
     */
      if (!newElements.isEqualNode(curEl) && newElements.firstChild?.nodeValue.trim() != '') {
        curEl.textContent = newElements.textContent;
        // console.log('AAA', newElements.firstChild.nodeValue.trim());
      }
      
      // Update or Change Element Attribute
      /** Below code is intended to update the attributes of the current element (curEl) with the attributes from the new element (newElements). However, newElements is a collection of elements, not a single element, so you need to iterate over each element in newElements and currentElements to update their attributes.
      */
      if (!newElements.isEqualNode(curEl)) {
        // console.log(newElements.attributes);
        // console.log(Array.from(newElements.attributes));
        Array.from(newElements.attributes).forEach(attributes => curEl.setAttribute(attributes.name,attributes.value))
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

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

