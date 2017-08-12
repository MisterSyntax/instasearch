import displayResults from './displayResults';

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
                //save last results for refresh

                localStorage.history = JSON.stringify({data: event.data});

                displayResults({data:event.data});
            };
        }, 500);
    });
};

export default searchBoxEnable;