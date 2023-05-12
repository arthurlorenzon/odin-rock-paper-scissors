//GAME
let playerScore = 0;
let computerScore = 0;
let roundWinner = '';

function computerPlay() {
    let num1 = Math.random();
    if (num1 < 0.333) {
      return "ROCK";
    } else if (0.333 <= num1 && num1 < 0.666) {
      return "PAPER";
    } else if (num1 > 0.666) {
      return "SCISSORS";
    }
  }
  
function playRound(playerPlay, computerPlay) {
  if (playerPlay == computerPlay) {
    roundWinner = 'tie';
  } else if (
    (computerPlay == "SCISSORS" && playerPlay == "ROCK") ||
    (computerPlay == "PAPER" && playerPlay == "SCISSORS") ||
    (computerPlay == "ROCK" && playerPlay == "PAPER")
  ) {
    playerScore++;
    roundWinner = 'player';
  } else if (
    (computerPlay == "SCISSORS" && playerPlay == "PAPER") ||
    (computerPlay == "PAPER" && playerPlay == "ROCK") ||
    (computerPlay == "ROCK" && playerPlay == "SCISSORS")
  ) {
    computerScore++;
    roundWinner = 'computer';
  }
  updateScoreMessage(roundWinner, playerPlay, computerPlay)
}

function gameOver() {
  return playerScore === 5 || computerScore === 5
}

//UI
const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerChose = document.getElementById('playerChose')
const cpuChose = document.getElementById('cpuChose')
const rockButton = document.getElementById('rockButton')
const paperButton = document.getElementById('paperButton')
const scissorsButton = document.getElementById('scissorsButton')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartButton = document.getElementById('restartButton')

rockButton.addEventListener('click', () => handleClick('ROCK'))
paperButton.addEventListener('click', () => handleClick('PAPER'))
scissorsButton.addEventListener('click', () => handleClick('SCISSORS'))
restartButton.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerPlay) {
  if (gameOver()) {
    openEndgameModal()
    return
  }

  const cpuPlay = computerPlay()
  playRound(playerPlay, cpuPlay)
  updateChoices(playerPlay, cpuPlay)
  updateScore()

  if (gameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerPlay, computerPlay) {
  switch (playerPlay) {
    case 'ROCK':
      playerChose.innerHTML = '<div class="hand"><img src="./img/rock.png" alt="rock"></div>';
      break;
    case 'PAPER':
      playerChose.innerHTML = '<div class="hand"><img src="./img/paper.png" alt="paper"></div>';
      break;
    case 'SCISSORS':
      playerChose.innerHTML = '<div class="hand"><img src="./img/scissors.png" alt="scissors"></div>';
      break;
  }

  switch (computerPlay) {
    case 'ROCK':
      cpuChose.innerHTML = '<div class="hand"><img src="./img/rock.png" alt="rock"></div>';
      break;
    case 'PAPER':
      cpuChose.innerHTML = '<div class="hand"><img src="./img/paper.png" alt="paper"></div>';
      break;
    case 'SCISSORS':
      cpuChose.innerHTML = '<div class="hand"><img src="./img/scissors.png" alt="scissors"></div>';
      break;
  }
}

function updateScore() {
  if  (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'Player win!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'Computer win!'
  }

  playerScorePara.textContent = `Player: ${playerScore}`
  computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage (winner, playerPlay, computerPlay) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(playerPlay)}
    beats ${computerPlay.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(computerPlay)}
    beats ${playerPlay.toLowerCase()}`
    return
  }
  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerPlay
  )} ties with ${computerPlay.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
  ? (endgameMsg.textContent = "Congrats, you won!")
  : (endgameMsg.textContent = "You lost, try again!")
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 points wins the game'
  playerScorePara.textContent = 'Player: 0'
  computerScorePara.textContent = 'Computer: 0'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
