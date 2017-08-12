/**
 * @desc: Creates the info container for the element with the imdId and the received data
 * @var: data {String} - the html that we'll add to the child node
 * @var: imdbID {String} - the imdbd identifier dor this element
 * @returns: {Element} - a div eleent with the info about the movie
 */

const createInfo = function (data, imdbID) {
    console.log(data);
    const div = document.createElement('div');

    //sets the new info box to either be closed or appear on whichever side has more room
    const className = document.querySelectorAll('.open').length > 0 ?
        'title-info-container closed'
        : (window.innerWidth - parent.offsetLeft > 600) ?
            'title-info-container open right'
            : 'title-info-container open left';

    div.setAttribute('class', className);
    div.setAttribute('id', `info-${imdbID}`)

    div.innerHTML = data;
    return div;
}

export default createInfo;