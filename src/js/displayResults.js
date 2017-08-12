import enableInfo from './enableInfo';
/**
 * @description: Takes an object which contains the data of the suggestions and displays them
 * @var: {object} resultData - An object that has a key data which contains the data for the last
 */
const displayResults = function(resultData){
    const suggestionBox = document.getElementById('search-suggestions');
    suggestionBox.innerHTML = '';
    resultData.data.forEach(result => {
        let div = document.createElement('div');
        div.setAttribute('class', 'result-container')
        div.innerHTML = result;
        suggestionBox.appendChild(div);
        enableInfo(div);
    });
}

export default displayResults;