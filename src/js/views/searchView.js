

class SearchView {
    _parentEl = document.querySelector('.search');

    getQuery(){
         let query = this._parentEl.querySelector('.search__field').value; 
          this._clearField();
         return query;
    }

    _clearField (){
     this._parentEl.querySelector('.search__field').value = ''; 
    }

    /** Publisher Function :- Get a input from controller Js to handle the events */
    addHandlerSearch(ControlSearchResults){
        this._parentEl.addEventListener('submit',function(e){
       e.preventDefault();
       ControlSearchResults();
        })
      }
    
}

export default new SearchView();