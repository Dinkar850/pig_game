'use strict';
//how to change die image when something occurs

const diceRoll = document.querySelector('.btn--roll');
const holdScore = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');
const firstPlayer = document.querySelector('.player--0');
const secondPlayer = document.querySelector('.player--1');
const currentFirstPlayerScore = document.querySelector('#current--0');
const currentSecondPlayerScore = document.querySelector('#current--1');
const totalFirstPlayerScore = document.querySelector('#score--0');
const totalSecondPlayerScore = document.querySelector('#score--1');
const makeFirstPlayerActive = () => {
    firstPlayer.classList.add('player--active');
    secondPlayer.classList.remove('player--active');
};
const makeSecondPlayerActive = () => {
    firstPlayer.classList.remove('player--active');
    secondPlayer.classList.add('player--active');
};
let firstPlayerLiveScore = 0;
let secondPlayerLiveScore = 0;
let firstPlayerTotalScore = 0;
let secondPlayerTotalScore = 0;
let win = 0;
const setFirstPlayerCurrentScore = () => {
    currentFirstPlayerScore.textContent = firstPlayerLiveScore;
};
const setSecondPlayerCurrentScore = () => {
    currentSecondPlayerScore.textContent = secondPlayerLiveScore;
};
const setFirstPlayerTotalScore = () => {
    firstPlayerTotalScore += firstPlayerLiveScore;
    totalFirstPlayerScore.textContent = firstPlayerTotalScore;
};
const setSecondPlayerTotalScore = () => {
    secondPlayerTotalScore += secondPlayerLiveScore;
    totalSecondPlayerScore.textContent = secondPlayerTotalScore;
};
let rollNumber = 0;
let turn = true;
diceImage.classList.add('hidden');
diceRoll.addEventListener('click', () => {
    if (!win) {
        rollNumber = Math.trunc(Math.random() * 6) + 1;
        diceImage.setAttribute('src', `dice-${rollNumber}.png`);
        if (diceImage.classList.contains('hidden'))
            diceImage.classList.remove('hidden');
        if (turn) {
            if (rollNumber === 1) {
                firstPlayerLiveScore = 0;
                makeSecondPlayerActive();
                turn = !turn;
            } else {
                firstPlayerLiveScore += rollNumber;
            }
            setFirstPlayerCurrentScore();
        } else {
            if (rollNumber === 1) {
                makeFirstPlayerActive();
                secondPlayerLiveScore = 0;
                turn = !turn;
            } else {
                secondPlayerLiveScore += rollNumber;
            }
            setSecondPlayerCurrentScore();
        }
    }
});

holdScore.addEventListener('click', () => {
    if (!win) {
        if (turn) {
            setFirstPlayerTotalScore();
            if (firstPlayerTotalScore >= 100) {
                firstPlayer.classList.add('player--winner');
                win = 1;
            } else {
                makeSecondPlayerActive();
                firstPlayerLiveScore = 0;
                setFirstPlayerCurrentScore();
            }
        } else {
            setSecondPlayerTotalScore();
            if (secondPlayerTotalScore >= 100) {
                secondPlayer.classList.add('player--winner');
                win = 1;
            } else {
                makeFirstPlayerActive();
                secondPlayerLiveScore = 0;
                setSecondPlayerCurrentScore();
            }
        }
        diceImage.classList.add('hidden');
        turn = !turn;
    }
});

newGame.addEventListener('click', () => {
    win = 0;
    diceImage.classList.add('hidden');
    if (firstPlayer.classList.contains('player--winner'))
        firstPlayer.classList.remove('player--winner');
    if (secondPlayer.classList.contains('player--winner'))
        secondPlayer.classList.remove('player--winner');
    if (secondPlayer.classList.contains('player--active'))
        secondPlayer.classList.remove('player--active');
    firstPlayerLiveScore = 0;
    secondPlayerLiveScore = 0;
    firstPlayerTotalScore = 0;
    secondPlayerTotalScore = 0;
    setFirstPlayerCurrentScore();
    setSecondPlayerCurrentScore();
    setFirstPlayerTotalScore();
    setSecondPlayerTotalScore();
    makeFirstPlayerActive();
});
