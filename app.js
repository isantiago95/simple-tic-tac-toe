const imgPlayerChoice = document.querySelector('#playerChoice');
const imgComputerChoice = document.querySelector('#computerChoice');

const result = document.getElementById('result');
const playerWon = document.querySelector('#player-won');
const playerLost = document.querySelector('#player-lost');
const buttons = document.querySelectorAll('button');

const options = ['rock', 'paper', 'scissors'];

buttons.forEach(btn => btn.addEventListener('click', startGame));

let won = 0;
let lost = 0;
function startGame({ currentTarget }) {
  // loading options

  imgPlayerChoice.setAttribute('src', 'images/loading.png');
  imgPlayerChoice.classList.add('loading');
  imgComputerChoice.setAttribute('src', 'images/loading.png');
  imgComputerChoice.classList.add('loading');

  // player choice
  const button = currentTarget;
  const playerChoice = button.dataset.choice;

  // get computer choice
  const computerChoice = getComputerChoice();

  // check who wins
  const winner = getWinner(playerChoice, computerChoice);

  const resultOptions = {
    player: () => {
      won++;
      result.innerHTML = `You <strong class="success">won</strong> by choosing <strong>${playerChoice}</strong> VS <strong>${computerChoice}</strong>`;
    },
    computer: () => {
      lost++;
      result.innerHTML = `You <strong class="danger">lost</strong> by choosing <strong>${playerChoice}</strong> VS <strong>${computerChoice}</strong>`;
    },
    none: () => {
      result.innerHTML = `The result was a <strong>DRAW</strong> `;
    },
  };

  // show results
  setTimeout(() => {
    imgPlayerChoice.setAttribute('src', `images/${playerChoice}.png`);
    imgPlayerChoice.classList.remove('loading');
    imgComputerChoice.setAttribute('src', `images/${computerChoice}.png`);
    imgComputerChoice.classList.remove('loading');
    resultOptions[winner ?? 'none']();
    playerWon.innerText = won;
    playerLost.innerText = lost;
  }, 300);
}

function getComputerChoice() {
  // get random number
  const i = parseInt(Math.random() * 3);
  // return option
  return options[i];
}

const winState = {
  // first options are for player because in getWinner, we call first the player choice
  rock: { rock: null, paper: 'computer', scissors: 'player' },
  paper: { rock: 'player', paper: null, scissors: 'computer' },
  scissors: { rock: 'computer', paper: 'player', scissors: null },
};

const getWinner = (playerChoice, computerChoice) => winState[playerChoice][computerChoice];
