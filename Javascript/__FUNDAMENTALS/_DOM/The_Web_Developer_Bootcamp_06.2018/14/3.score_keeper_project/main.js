const scorePlayerOne = document.querySelector('.player-one-score');
const scorePlayerTwo = document.querySelector('.player-two-score');
const maxScore = document.querySelector('.select-max-sore');
const buttonPlayerOne = document.querySelector('.player-one-button');
const buttonPlayerTwo = document.querySelector('.player-two-button');
const resetScore = document.querySelector('.reset-score');


buttonPlayerOne.addEventListener('click', function() {
    scorePlayerOne.textContent = +scorePlayerOne.textContent + 1;
    if (+scorePlayerOne.textContent === +maxScore.value) {
        document.querySelector('.section-result h1').textContent = 'Player One won the Game';
        document.querySelector('.section-score').classList.toggle('hidden');
        document.querySelector('.section-game-rules').classList.toggle('hidden');
        document.querySelector('.section-players').classList.toggle('hidden');
    }
});
buttonPlayerTwo.addEventListener('click', function() {
    scorePlayerTwo.textContent = +scorePlayerTwo.textContent + 1;
    if (+scorePlayerTwo.textContent === +maxScore.value) {
        document.querySelector('.section-result h1').textContent = 'Player Two won the Game';
        document.querySelector('.section-score').classList.toggle('hidden');
        document.querySelector('.section-game-rules').classList.toggle('hidden');
        document.querySelector('.section-players').classList.toggle('hidden');
    }
});

resetScore.addEventListener('click', function() {
    scorePlayerOne.textContent = 0;
    scorePlayerTwo.textContent = 0;
    if (document.querySelector('.section-game-rules').classList.contains('hidden')) {
        document.querySelector('.section-game-rules').classList.toggle('hidden');
    }
    if (document.querySelector('.section-players').classList.contains('hidden')) {
        document.querySelector('.section-players').classList.toggle('hidden');
    }
    if (document.querySelector('.section-score').classList.contains('hidden')) {
        document.querySelector('.section-score').classList.toggle('hidden');
    }
    document.querySelector('.section-result h1').textContent = '';
});
