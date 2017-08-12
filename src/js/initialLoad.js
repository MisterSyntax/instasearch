import displayResults from './displayResults.js';

const initialLoad = function(){ 
    if(localStorage.history){
        displayResults(localStorage.history);
    }

}

export default initialLoad;