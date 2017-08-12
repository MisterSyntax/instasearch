import './main.css'

(function () {
    /**
     * @desc: Sets up eventlisteners for search box
     */
    function searchBoxEnable() {
        const search = document.getElementById('search-term');
        const suggestionBox = document.getElementById('search-suggestions');
        let lastWorker;
        search.addEventListener('input', (e) => {
            console.log('inputting')
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
    /**
     * @desc: Sets up info on hover or click for each suggestion
     */
    function enableInfo(node) {
        window.curr = node;
        const imdbID = node.querySelector('.title-container').id;
        node.addEventListener('mouseenter', function () {
            //if we have already created the title info container show it, otherwise create it
            const titleInfoContainer = node.querySelector('.title-info-container')
            if (titleInfoContainer) {
                titleInfoContainer.setAttribute('class', 'title-info-container open');
            }
            else {
                const worker = new Worker('./webWorkers/requestInfo.js');
                worker.postMessage(imdbID);
                worker.onmessage = function (event) {
                    let div = document.createElement('div');
                    div.setAttribute('class', 'title-info-container open')
                    div.setAttribute('id', `info-${imdbID}`)
                    div.innerHTML = event.data;
                    node.appendChild(div);
                }
            }
        })
        node.addEventListener('mouseleave', function () {
            const titleInfoContainer = node.querySelector('.title-info-container')
            if (titleInfoContainer) {
                titleInfoContainer.setAttribute('class', 'title-info-container closed');
            }

        })
    }

    searchBoxEnable();

}());
