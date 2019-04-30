const tag = document.getElementsByTagName('h1')[0];
console.log(tag);

tag.addEventListener('mouseover', mouseOver);
// tag.addEventListener('mouseout', mouseOut);

function mouseOver() {
    tag.classList.toggle('modified-h1');
}

// function mouseOut() {
//     tag.classList.remove('modified-h1');
// }
