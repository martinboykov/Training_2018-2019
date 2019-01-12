const MAX_NUMBER = 255 + 1;
const firstNumber = document.querySelector('.rgb-color--first');
const secondNumber = document.querySelector('.rgb-color--second');
const thirdNumber = document.querySelector('.rgb-color--third');
const buttonNewColors = document.querySelector('.nav-left__new--colors');
const easyMode = document.querySelector('.nav-right__easy');
const hardMode = document.querySelector('.nav-right__hard');
document.querySelector('.container').innerHTML = `
<button class="first-cube"></button>
<button class="second-cube"></button>
<button class="third-cube"></button>
<button class="forth-cube"></button>
<button class="fifth-cube"></button>
<button class="sixth-cube"></button>
`;
easyMode.addEventListener('click', function() {
    document.querySelector('.container').innerHTML = `
            <button class="first-cube"></button>
            <button class="second-cube"></button>
            <button class="third-cube"></button>
    `;
    hardMode.classList.remove('highlighted');
    easyMode.classList.add('highlighted');
    newGame();
});
hardMode.addEventListener('click', function() {
    document.querySelector('.container').innerHTML = `
            <button class="first-cube"></button>
            <button class="second-cube"></button>
            <button class="third-cube"></button>
            <button class="forth-cube"></button>
            <button class="fifth-cube"></button>
            <button class="sixth-cube"></button>
    `;
    hardMode.classList.add('highlighted');
    easyMode.classList.remove('highlighted');
    newGame();
});


newGame();
buttonNewColors.addEventListener('click', function() {
    newGame();
});

function newGame() {
    const cubes = [].slice.call(document.querySelectorAll(`.container > [class*='cube']`));
    const cubesCount = cubes.length;
    cubes.forEach((cube) => resetTheGame(cube));
    const rgb = cubes[`${getRandomCube(cubesCount)}`].style.backgroundColor;
    // console.log(rgb);
    const rgbParsed = parseRGB(rgb);
    // console.log(rgbParsed);
    firstNumber.innerHTML = rgbParsed[0];
    secondNumber.innerHTML = rgbParsed[1];
    thirdNumber.innerHTML = rgbParsed[2];
    cubes.forEach((cube) => cube.addEventListener('click', function() {
        checkRgbValues(cube, rgb);
    }));
}


function resetTheGame(cube) {
    cube.innerHTML = '';
    cube.style.setProperty('background-color',
        `rgb(${getRandomInt()}, ${getRandomInt()}, ${getRandomInt()})`);
    const rgb = cube.style.backgroundColor;
    console.log(rgb);
    changeFontColor(cube, rgb);
}
function changeFontColor(cube, rgb) {
    const rgbParsed = parseRGB(rgb);
    // console.log(rgbParsed);
    const luma = 0.2126 * rgbParsed[0] + 0.7152 * rgbParsed[1] + 0.0722 * rgbParsed[2]; // per ITU-R BT.709
    if (luma < 80) {
        cube.style.setProperty('color',
            `white`);
    } else {
        cube.style.setProperty('color',
            `black`);
    }
}
function parseRGB(rgb) {
    const result = rgb.substring(4, rgb.length - 1)
        .replace(/ /g, '')
        .split(',');
    return result;
}

function getRandomCube(cubesCount) {
    return Math.floor(Math.random() * Math.floor(cubesCount + 1));
}

function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(MAX_NUMBER));
}
function checkRgbValues(cube, rgb) {
    if (cube.style.backgroundColor === rgb) {
        cube.innerHTML = `<div class=\'text-animation\'>You won! </br>${cube.style.backgroundColor}</div>`;
        console.log(`correct! </br> ${cube.style.backgroundColor}`);
        console.log();
    } else {
        // cube.innerHTML = 'You guessed wrong. </br>Try aggain!';
        cube.innerHTML = `WRONG! </br> ${cube.style.backgroundColor}`;
        console.log(`WRONG! </br> ${cube.style.backgroundColor}`);
    }
}

