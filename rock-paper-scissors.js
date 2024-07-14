function playGame(rounds) {
  const CHOICES = ['rock', 'paper', 'scissors'];
  const WIN_TEXT = 'You Win! ';
  const LOSE_TEXT = 'You Lose! ';
  const TIE_TEXT = 'Tie!';
  const PAPER_WIN_TEXT = 'Paper beats Rock!';
  const ROCK_WIN_TEXT = 'Rock beats Scissors!';
  const SCISSORS_WIN_TEXT = 'Scissors beats Paper!';
  let humanScore = 0;
  let computerScore = 0;
  
  function getComputerChoice() {
    const random_i = Math.floor(Math.random() * 3);
    return CHOICES[random_i];
  }
  
  function getHumanChoice() {
    let choice;
    do {
      choice = prompt('Rock (R), paper (P) or scissors (S)?');
      choice = sanitizeChoice(choice);
    } while (!choice);
    return choice;
  }
  
  function sanitizeChoice(choice) {
    if (choice === null) return 'exit';

    switch (choice.toLowerCase()) {
      case 'r':
      case 'rock':
        return 'rock';
      case 'p':
      case 'paper':
        return 'paper';
      case 's':
      case 'scissors':
        return 'scissors';
      default:
        console.warn(`${choice} is not a valid choice. Must be Rock, Papare or Scissors!`);
        return false;
    }
  }

  function playRound(humanChoice, computerChoice) {
    switch (humanChoice) {
      case 'rock':
        switch (computerChoice) {
          case 'rock':
            console.log(TIE_TEXT);
            break;
          case 'paper':
            console.log(LOSE_TEXT + PAPER_WIN_TEXT);
            computerScore++;
            break;
          case 'scissors':
            console.log(WIN_TEXT + ROCK_WIN_TEXT);
            humanScore++;
            break;
        }
        break;
      case 'paper':
        switch (computerChoice) {
          case 'rock':
            console.log(WIN_TEXT + PAPER_WIN_TEXT);
            humanScore++;
            break;
          case 'paper':
            console.log(TIE_TEXT);
            break;
          case 'scissors':
            console.log(LOSE_TEXT + SCISSORS_WIN_TEXT);
            computerScore++;
            break;
        }
        break;
      case 'scissors':
        switch (computerChoice) {
          case 'rock':
            console.log(LOSE_TEXT + ROCK_WIN_TEXT);
            computerScore++;
            break;
          case 'paper':
            console.log(WIN_TEXT + SCISSORS_WIN_TEXT);
            humanScore++;
            break;
          case 'scissors':
            console.log(TIE_TEXT);
            break;
        }
        break;
    }
  }

  console.log(`Playing to best of ${rounds}`);
  for (let i = 0; i < rounds; i++) {
    console.log(`Round ${i+1}:`);

    let humanChoice = getHumanChoice();
    if (humanChoice === 'exit') {
      console.log('Aborting game.');
      return;
    }

    let computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }

  const output = (humanScore > computerScore
    ? WIN_TEXT + `${humanScore} to ${computerScore}`
    : humanScore === computerScore
      ? TIE_TEXT + ` Both had ${humanScore} points.`
      : LOSE_TEXT + `${computerScore} to ${humanScore}`
  );
  console.log(output);
}