/* 
GAME FUNCTION
- Player must guess a number between a min and max
- Player gets certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listner
game.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  // validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  }

  // Check if won
  if (guess === winningNum) {

    gameOver(true, `${winningNum} is correct, YOU WIN!`)

  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over  - lost

      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)

    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = "red";

      // clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }

  // console.log(guess);
});


// Game over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Get Random Number
function getRandomNum(min, max) {
  return Math.floor(Math.random()*(max - min+1)+min);
}

// set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
