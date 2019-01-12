const button = document.querySelector('button');
const body = document.body;
console.log(button);
// let isPurple = true;
button.addEventListener('click', function() {
    toggleColor();
});
// function toggleColor() {
//     if (body.style.background !== 'purple') {
//         body.style.background = 'purple';
//         isPurple = false;
//     } else {
//         body.style.background = 'white';
//         isPurple = true;
//     }
// }
// function toggleColor() {
//     if (body.className !== 'purple') {
//         body.className = 'purple';
//     } else {
//         body.className = 'white';
//     }
// }
function toggleColor() {
    body.classList.toggle('purple');
}
