import enableInfo from './enableInfo';

const displayResults = function(resultData){
    console.log(resultData);
    const suggestionBox = document.getElementById('search-suggestions');
    suggestionBox.innerHTML = '';
    event.data.forEach(result => {
        let div = document.createElement('div');
        div.setAttribute('class', 'result-container')
        div.innerHTML = result;
        suggestionBox.appendChild(div);
        enableInfo(div);
    });
}

export default displayResults;