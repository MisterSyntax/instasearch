/**
 * @desc:
 * @var: {Object} e - The message event passed to the worker. 
 * @var: {string} e.data - The imdbID to use
 * @returns: {Array} - This will be an array of html objects containing the results 
 *  - each result in array will contain a string of the 
 */

onmessage = function (e) {
    if (e.data) {
        const url = `http://www.omdbapi.com/?apikey=aba065d3&i=${e.data}`;
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', url, false);
        xmlHttp.send();
        const results = JSON.parse(xmlHttp.responseText);
        if (results.Response === 'True') {
            let htmlOutput = `
                <div class="title-info">
                    <div class="info-title">${results.Title}</div>
                    <div class="info-year-director"><span class="year">(${results.Year})</span> <span class="director">${results.Director}</span></div>
                    <div class="info-ratings">
                        <h4>Ratings:</h4>${
                            results.Ratings.length ?
                                results.Ratings.map(curr=>`<div>${curr.Source}: ${curr.Value}</div>`).join('')
                                : 'No Ratings Yet'
                        }
                    </div>
                </div`;
            postMessage(htmlOutput);
        };
    }
    close();
};

