/**
 * Class representing the view for displaying search results.
 * @extends View
 */
import View from "./View";

class addRecipeView extends View {
   _parentElement = document.querySelector(".upload");
   _message = "Recipe was successfully uploaded";
   _window = document.querySelector(".add-recipe-window");
   _overlay = document.querySelector(".overlay");
   _btnOpen = document.querySelector(".nav__btn--add-recipe");
   _btnClose = document.querySelector(".btn--close-modal");


   constructor() {
      super();
      this._addHandlerShowWindow;
      this._addHandlerHideWindow;
   }

    toggleWindow() {
      this._window.classList.toggle("hidden");
      this._overlay.classList.toggle("hidden");
      if (this._window.classList.contains("hidden")) {
         this._parentElement.reset(); // Reset the form fields
      }
   }

   addHandlerShowWindow = function () {
      this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
   }

   addHandlerHideWindow = function () {
      this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
      this._overlay.addEventListener("click", this.toggleWindow.bind(this));
   }

   addHandlerUpload(handler){
      this._parentElement.addEventListener("submit",function(e){
         e.preventDefault();
         const dataArr = [...new FormData(this)];
         const data = Object.fromEntries(dataArr);
         handler(data);
      })
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

   }


}

export default new addRecipeView();