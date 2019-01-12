const newGame = document.querySelector('.overlay__new-game a');
const dice = document.querySelector('.overlay__dice');
console.log(dice);
const rollDice = document.querySelector('.overlay__roll-dice a');
const holdScore = document.querySelector('.overlay__hold a');

const playerOne = document.querySelector('.wrapper__left-side .top');
const playerOneCurrentScore = document.
    querySelector('.wrapper__left-side .middle .current-score');
const playerOneScoreToHold = document.
    querySelector('.wrapper__left-side .bottom .score-hold');

const playerTwo = document.querySelector('.wrapper__right-side .top');
const playerTwoCurrentScore = document.
    querySelector('.wrapper__right-side .middle .current-score');
const playerTwoScoreToHold = document.
    querySelector('.wrapper__right-side .bottom .score-hold');


let switchPlayers = 1;

newGame.addEventListener('click', function() {
    resetGame();
});

rollDice.addEventListener('click', rollTheDice);

holdScore.addEventListener('click', holdTheScore);

function rollTheDice() {
    startAnimation();
    const diceNumber = getRandomDice();
    setTimeout(function() {
        dice.setAttribute('style',
            `background-image:
            url('./images/dice-${diceNumber}.png`);
    }, 1800);
    setTimeout(function() {
        //  PLAYER 1
        if (switchPlayers === 1) {
            if (diceNumber === 1) {
                playerOneScoreToHold.innerHTML = 0;
                switchPlayers = 2; togglePlayerOne(); togglePlayerTwo();
            } else {
                playerOneScoreToHold.innerHTML =
                    parseInt(playerOneScoreToHold.innerHTML, 10) +
                    diceNumber;
            }
        } else {
            //  PLAYER 2
            if (diceNumber === 1) {
                playerTwoScoreToHold.innerHTML = 0;
                switchPlayers = 1; togglePlayerOne(); togglePlayerTwo();
            } else {
                playerTwoScoreToHold.innerHTML =
                    parseInt(playerTwoScoreToHold.innerHTML, 10) +
                    diceNumber;
            }
        }
    }, 1800);
}

function holdTheScore() {
    if (switchPlayers === 1) {
        playerOneCurrentScore.innerHTML =
            parseInt(playerOneCurrentScore.innerHTML, 10) +
            parseInt(playerOneScoreToHold.innerHTML, 10);
        playerOneScoreToHold.innerHTML = 0;

        // PLAYER 1 WON
        if (parseInt(playerOneCurrentScore.innerHTML, 10) >= 10) {
            wonGame();
        } else {
            switchPlayers = 2; togglePlayerOne(); togglePlayerTwo();
        }
    } else {
        //  PLAYER 2
        playerTwoCurrentScore.innerHTML =
            parseInt(playerTwoCurrentScore.innerHTML, 10) +
            parseInt(playerTwoScoreToHold.innerHTML, 10);
        playerTwoScoreToHold.innerHTML = 0;
        // PLAYER 2 WON
        if (parseInt(playerTwoCurrentScore.innerHTML, 10) >= 10) {
            wonGame();
        } else {
            switchPlayers = 1; togglePlayerOne(); togglePlayerTwo();
        }
    }
}

function wonGame() {
    if (switchPlayers === 1) {
        playerOneCurrentScore.innerHTML = `
        <img src="./images/trophy.png" alt="trophy">`;
    } else {
        playerTwoCurrentScore.innerHTML = `
        <img src="./images/trophy.png" alt="trophy">`;
    }
    newGame.setAttribute('style',
        `animation: scaling 400ms 0.1ms infinite ease-in-out none;`);
    rollDice.removeEventListener('click', rollTheDice);
    holdScore.removeEventListener('click', holdTheScore);
}

function resetGame() {
    newGame.removeAttribute('style',
        `animation: scaling 400ms 0.1ms infinite ease-in-out none;`);
    rollDice.addEventListener('click', rollTheDice);
    holdScore.addEventListener('click', holdTheScore);
    if (switchPlayers === 2) {
        switchPlayers = 1; togglePlayerOne(); togglePlayerTwo();
    }
    playerOneCurrentScore.innerHTML = 0;
    playerOneScoreToHold.innerHTML = 0;
    playerTwoCurrentScore.innerHTML = 0;
    playerTwoScoreToHold.innerHTML = 0;
    dice.setAttribute('style',
        `background-image: url('./images/dice-1.png');`);
}
function togglePlayerOne() {
    playerOne.classList.toggle('on-turn');
}
function togglePlayerTwo() {
    playerTwo.classList.toggle('on-turn');
}

function startAnimation() {
    dice.setAttribute('style',
        'animation: rotate 600ms ease-in-out 0.1ms 3 none;');
    document.querySelector('.overlay').setAttribute('style', 'z-index: 0;');
    setTimeout(function() {
        dice.removeAttribute('style',
            'animation: rotate 600ms ease-in-out 0.1ms 3 none;');
    }, 1800);
    setTimeout(function() {
        document.querySelector('.overlay').setAttribute('style', 'z-index: 2;');
    }, 1800);
}

function getRandomDice() {
    return Math.floor(Math.random() * Math.floor(5 + 1) + 1);
}
