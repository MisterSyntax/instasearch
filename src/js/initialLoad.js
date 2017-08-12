import displayResults from './displayResults.js';

const initialLoad = function(){ 
    if(localStorage.history){
        displayResults(JSON.parse(localStorage.history));
    }

}

export default initialLoad;