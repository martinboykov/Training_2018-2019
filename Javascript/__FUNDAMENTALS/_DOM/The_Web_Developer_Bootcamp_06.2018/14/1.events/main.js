const button = document.querySelector('button');
const div = document.querySelector('div');
const video = document.querySelector('video');
let toggleVideo = true;
button.onclick = function() {
    div.setAttribute('class', 'showing');
};
div.onclick = function() {
    div.setAttribute('class', 'hidden');
};
video.onclick = function(e) {
    // e.stopPropagation();
    if (toggleVideo) {
        video.play();
        toggleVideo = false;
    } else {
        video.pause();
        toggleVideo = true;
    }
};
