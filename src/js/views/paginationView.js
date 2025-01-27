import View from "./View.js";
import icons from "url:../../img/icons.svg";
/**
 * PaginationView class handles the rendering of pagination buttons.
 * It extends the View class.
 */
class PaginationView extends View {
    /**
     * The parent element where pagination buttons will be rendered.
     * @type {HTMLElement}
     */
    _parentElement = document.querySelector(".pagination");

    /**
     * Generates the markup for the backward pagination button.
     * 
     * @param {number} currentPage - The current page number.
     * @returns {string} The HTML markup for the backward pagination button.
     */
    genrateMarkupButtonBackward(currentPage) {
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
        `;
    }

    /**
     * Adds an event handler for pagination button clicks.
     * 
     * @param {Function} handler - The handler function to call on button click.
     */
    addHandlerClick(handler) {
        this._parentElement.addEventListener("click",function(e){
            const btn = e.target.closest(".btn--inline");
            if(!btn) return;
            const gotoPage = +btn.dataset.goto;     
            handler(gotoPage);
        })
    }

    /**
     * Generates the markup for the forward pagination button.
     * 
     * @param {number} currentPage - The current page number.
     * @returns {string} The HTML markup for the forward pagination button.
     */
    genrateMarkupButtonForward(currentPage) {
        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;
    }

    /**
     * Generates the markup for the pagination buttons.
     * 
     * This method determines the number of pages and generates the appropriate
     * pagination buttons based on the current page.
     * 
     * @returns {string} The HTML markup for the pagination buttons.
     */
    _genrateMarkup() {
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);
        const currentPage = this.data.page;
        // Page 1 and there are other pages
        if (this.data.page === 1 && numPages > 1) {
            return  this.genrateMarkupButtonForward(currentPage);
        }

        // last page
        if (this.data.page === numPages && numPages > 1) {
            return this.genrateMarkupButtonBackward(currentPage);
        }
        // other page
        if (this.data.page < numPages) {
            return `${this.genrateMarkupButtonBackward(currentPage)} ${this.genrateMarkupButtonForward(currentPage)}`;
        }

        return "";
    }

}

export default new PaginationView;