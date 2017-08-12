/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 */
const enableInfo = function (node) {

    const imdbID = node.querySelector('.title-container').id;

    node.addEventListener('mouseenter', function () {
        //if we have already created the title info container show it, otherwise create it
        const titleInfoContainer = node.querySelector('.title-info-container');

        //TODO: UPDATE FOR ALL DEVICES determine placement of info container
        if (titleInfoContainer) {
            const className = (window.innerWidth - node.offsetLeft > 600) ?
                'title-info-container open right'
                : 'title-info-container open left';
            //check to see if there is at least 600px left to the right
            titleInfoContainer.setAttribute('class',className);
            
        }
        else {
            /**
             * @desc: this creates a web worker that makes an api request for the movies info
             * if when the worker finishes, the user hasn't moved on to another info box, display this one
             */
            const worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);

            worker.onmessage = function (event) {
                const div = document.createElement('div');

                //sets the new info box to either be closed or appear on whichever side has more room
                const className = document.querySelectorAll('.open').length > 0 ? 
                    'title-info-container closed'
                    : (window.innerWidth - node.offsetLeft > 600) ? 
                        'title-info-container open right'
                        :'title-info-container open left';

                div.setAttribute('class', className);
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

export default enableInfo;