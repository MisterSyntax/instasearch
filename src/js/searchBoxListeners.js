import enableInfo from './enableInfo'

/**
 * @desc: Sets up eventlisteners for search box
 */
const searchBoxEnable = function() {
    const search = document.getElementById('search-term');
    const suggestionBox = document.getElementById('search-suggestions');
    let lastWorker;
    search.addEventListener('input', (e) => {
        if (lastWorker) {
            lastWorker.terminate();
        }
        //delay launching web worker to minimize requests until user is done typing
        setTimeout(function () {
            //launch a web worker to get the appropriate titles and 
            const worker = new Worker('./webWorkers/requestTitles.js');
            lastWorker = worker;
            worker.postMessage(e.target.value);
            worker.onmessage = function (event) {
                suggestionBox.innerHTML = '';
                event.data.forEach(result => {
                    let div = document.createElement('div');
                    div.setAttribute('class', 'result-container')
                    div.innerHTML = result;
                    suggestionBox.appendChild(div);
                    enableInfo(div);
                });
            };
        }, 500);
    });
};

export default searchBoxEnable;