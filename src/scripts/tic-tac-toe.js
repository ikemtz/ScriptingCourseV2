'Strict Mode';
const xElement = '<div>X</div>';
const oElement = '<div>O</div>';
const rowArray = ['a', 'b', 'c'];
const colArray = [0, 1, 2];
const diag1Array = ['a0', 'b1', 'c2'];
const diag2Array = ['a2', 'b1', 'c0'];
let gameFinished = false;
const board = {
  a0: null,
  a1: null,
  a2: null,
  b0: null,
  b1: null,
  b2: null,
  c0: null,
  c1: null,
  c2: null
};

let isCurrentPlayerX = false;

function drawBoard() {
  if (!(gameFinished = checkForWinner())) {
    isCurrentPlayerX = !isCurrentPlayerX;
    document.getElementById('currentPlayer').innerText = isCurrentPlayerX ? "X" : "O";
  }
  else {
    alert(`Player ${isCurrentPlayerX ? "X" : "O"} won!`);
  }
  for (var item in board) {
    document.getElementById(item).innerHTML = board[item] === null ? null : board[item] ? xElement : oElement;
  }
}

function checkForWinner() {
  //check for matching rows;
  var matchingRows = rowArray.filter(row =>
    colArray.map(col => board[`${row}${col}`])
      .every(matchLogic));
  if (matchingRows.length > 0) {
    colArray.forEach(col => document.getElementById(`${matchingRows[0]}${col}`).classList.add('winningTile')
    );
    return true;
  }

  //check for matching cols;
  var matchingCols = [0, 1, 2].filter(col =>
    rowArray.map(row => board[`${row}${col}`])
      .every(matchLogic));
  if (matchingCols.length > 0) {
    rowArray.forEach(row => document.getElementById(`${row}${matchingCols[0]}`).classList.add('winningTile')
    );
    return true;
  }

  //check for diag1;
  var hasMatch = diag1Array.map(item => board[item]).every(matchLogic);
  if (hasMatch) {
    diag1Array.forEach(item => document.getElementById(`${item}`).classList.add('winningTile')
    );
    return true;
  }

  //check for diag2
  hasMatch = diag2Array.map(item => board[item]).every(matchLogic);
  if (hasMatch) {
    diag2Array.forEach(item => document.getElementById(`${item}`).classList.add('winningTile')
    );
    return true;
  }
}

function matchLogic(value, index, array) {
  return value !== null && value === array[0];
}

function resetGame() {
  for (var item in board) {
    board[item] = null;
    document.getElementById(`${item}`).classList.remove('winningTile');
  }
  isCurrentPlayerX = !isCurrentPlayerX;
  drawBoard();
}

function tileClicked(tile) {
  if (board[tile] !== null) {
    alert('That move is not allowed!')
  }
  else if (gameFinished) {
    alert('The current game has finished, no more moves are allowed!');
  }
  else {
    board[tile] = isCurrentPlayerX;
    drawBoard();
  }
}
//initializes the board
(() => {
  drawBoard();
})();
