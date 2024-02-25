const X_CLASS = `x`;
const CIRCLE_CLASS = `circle`;
let circleTurn;
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const dataElement = document.querySelectorAll(`[box-data]`);
const block = document.getElementById(`block`);
const winningTextElement = document.getElementById(`winningMessage`);
const winningText = document.querySelector(`[winning-text]`);
const restart = document.getElementById(`restartBtn`);

startGame();

restart.addEventListener(`click`, startGame);
function startGame() {
  circleTurn = false;
  dataElement.forEach((box) => {
    box.classList.remove(X_CLASS);
    box.classList.remove(CIRCLE_CLASS);

    box.addEventListener(`click`, handleClick, { once: true });
  });

  setBlockHover();

  winningTextElement.classList.remove(`show`);
}
function handleClick(e) {
  const box = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(box, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBlockHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = `Draw 😒`;
  } else {
    winningText.innerText = `${circleTurn ? "O's" : "X's"} Wins 😃`;
  }
  winningTextElement.classList.add(`show`);
}

function isDraw() {
  return [...dataElement].every((box) => {
    return (
      box.classList.contains(X_CLASS) || box.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(box, currentClass) {
  box.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBlockHover() {
  block.classList.remove(X_CLASS);
  block.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    block.classList.add(CIRCLE_CLASS);
  } else {
    block.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return dataElement[index].classList.contains(currentClass);
    });
  });
}
