/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 */
const enableInfo = function (node) {

    const imdbID = node.querySelector('.title-container').id;
    node.addEventListener('mouseenter', function () {
        window.curr = node;
        //close any open info containers
        document.querySelectorAll('.open').forEach(node => { node.setAttribute("class", "title-info-container closed") });

        //if we have already created the title info container show it, otherwise create it
        const titleInfoContainer = node.querySelector('.title-info-container');

        //TODO: determine placement of info container
        if (titleInfoContainer) {
            //check to see if there is at least 600px left to the right
            if(window.innerWidth - node.offsetLeft > 600){
                titleInfoContainer.setAttribute('class', 'title-info-container open right');
            }
            else{
                titleInfoContainer.setAttribute('class', 'title-info-container open left');
            }
            
        }
        else {
            const worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);
            worker.onmessage = function (event) {
                let div = document.createElement('div');
                console.log(window.innerWidth - node.offsetLeft)
                if(window.innerWidth - node.offsetLeft > 600){
                    div.setAttribute('class', 'title-info-container open right')
                }
                else{
                    div.setAttribute('class', 'title-info-container open left');
                }
                
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