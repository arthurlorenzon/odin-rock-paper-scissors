function computerPlay() {
    let num1 = Math.random();
    if (num1 < 0.333) {
      return "ROCK";
    } else if (0.333 < num1 && num1 < 0.666) {
      return "PAPER";
    } else if (num1 > 0.666) {
      return "SCISSORS";
    }
  }
  
  function playerPlay() {
    const ask = prompt("Rock, paper, or scissors?").toUpperCase();
    return ask;
  }
  
  function playRound(playerPlay, computerPlay) {
    if (playerPlay == computerPlay) {
      return "tie";
    } else if (
      (computerPlay == "SCISSORS" && playerPlay == "ROCK") ||
      (computerPlay == "PAPER" && playerPlay == "SCISSORS") ||
      (computerPlay == "ROCK" && playerPlay == "PAPER")
    ) {
      return "player";
    } else if (
      (computerPlay == "SCISSORS" && playerPlay == "PAPER") ||
      (computerPlay == "PAPER" && playerPlay == "ROCK") ||
      (computerPlay == "ROCK" && playerPlay == "SCISSORS")
    ) {
      return "computer";
    }
  }
  
  let playerScore = 0;
  let computerScore = 0;
  
  function gameWinner() {
    while (playerScore < 5 && computerScore < 5) {
      let result = playRound(playerPlay(), computerPlay());
  
      if (result == "player") {
        playerScore++;
        alert(`Player won the round, ${playerScore} points`);
      } else if (result == "computer") {
        computerScore++;
        alert(`Computer won the round, ${computerScore} points`);
      } else if (result == "tie") {
        alert("It's a tie, play again!");
      }
    }
  
    if (playerScore == 5) {
      alert("Player won the game!");
    } else if (computerScore == 5) {
      alert("Computer won the game!");
    }
  }
  
  gameWinner();