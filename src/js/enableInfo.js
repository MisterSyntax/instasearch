import createInfo from './createInfo.js'

/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 * @var {Node} node - the node we want to enable or create the info box for
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
            const worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);

            worker.onmessage = function (event) {
                node.appendChild(createInfo(event.data, imdbID));
            }
        }
    });
    //Closes the container on mouseleave
    node.addEventListener('mouseleave', function () {
        const titleInfoContainer = node.querySelector('.title-info-container')
        if (titleInfoContainer) {
            titleInfoContainer.setAttribute('class', 'title-info-container closed');
        }
    });
}

export default enableInfo;