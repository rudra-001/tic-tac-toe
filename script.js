const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let gameEnded = false;
let board = ['', '', '', '', '', '', '', '', ''];

function makeMove(index) {
  if (gameEnded || board[index] !== '') return;

  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    document.getElementById('result').innerText = `Player ${currentPlayer} wins! \u{1F389}`;
    document.getElementById('result').className = 'result result--win';
    document.getElementById('result').style.display = 'block';
    gameEnded = true;
    return;
  }

  if (checkDraw()) {
    document.getElementById('result').innerText = 'It\'s a draw! ';
    document.getElementById('result').className = 'result result--draw';
    document.getElementById('result').style.display = 'block';
    gameEnded = true;
    return;
  }

  currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  return !board.includes('');
}

function resetBoard() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = PLAYER_X;
  gameEnded = false;
  document.getElementById('result').innerText = '';
  document.getElementById('result').style.display = 'none';
  Array.from(document.getElementsByClassName('cell')).forEach(cell => {
    cell.innerText = '';
  });
}
