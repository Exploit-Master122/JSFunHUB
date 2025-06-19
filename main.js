// Simple menu logic
const btnGames = document.getElementById('btn-games');
const btnBrowser = document.getElementById('btn-browser');
const mainContent = document.getElementById('main-content');

function showGames() {
  btnGames.classList.add('active');
  btnBrowser.classList.remove('active');
  mainContent.innerHTML = `
    <h2>Games</h2>
    <button onclick="loadTicTacToe()">Tic Tac Toe</button>
    <button onclick="loadSnake()">Snake</button>
    <div id="game-container" style="margin-top:2rem;"></div>
  `;
}

function showBrowser() {
  btnGames.classList.remove('active');
  btnBrowser.classList.add('active');
  mainContent.innerHTML = `
    <h2>Web Browser</h2>
    <label>
      URL: <input type="text" id="browser-url" value="https://example.com" style="width:300px">
      <button onclick="loadIframe()">Go</button>
    </label>
    <div style="margin-top:1rem;">
      <iframe id="browser-iframe" src="https://example.com"></iframe>
    </div>
  `;
}

window.loadIframe = function() {
  const url = document.getElementById('browser-url').value;
  document.getElementById('browser-iframe').src = url;
};

// Simple Tic Tac Toe Game
window.loadTicTacToe = function() {
  const container = document.getElementById('game-container');
  container.innerHTML = `
    <h3>Tic Tac Toe</h3>
    <div id="ttt-board" style="display:grid;grid-template-columns:repeat(3,60px);gap:5px;"></div>
    <p id="ttt-status"></p>
    <button onclick="loadTicTacToe()">Restart</button>
  `;
  const boardElem = document.getElementById('ttt-board');
  let board = Array(9).fill('');
  let player = 'X';
  let gameOver = false;

  function render() {
    boardElem.innerHTML = '';
    board.forEach((cell, idx) => {
      const b = document.createElement('button');
      b.textContent = cell;
      b.style.width = '60px'; b.style.height = '60px'; b.style.fontSize = '2rem';
      b.disabled = cell || gameOver;
      b.onclick = () => move(idx);
      boardElem.appendChild(b);
    });
    document.getElementById('ttt-status').textContent = gameOver ? getWinnerMsg() : `Turn: ${player}`;
  }

  function move(idx) {
    if (!board[idx] && !gameOver) {
      board[idx] = player;
      if (checkWinner()) {
        gameOver = true;
      } else {
        player = player === 'X' ? 'O' : 'X';
      }
      render();
    }
  }

  function checkWinner() {
    const winCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let combo of winCombos) {
      const [a,b,c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return true;
    }
    if (board.every(cell => cell)) return true;
    return false;
  }

  function getWinnerMsg() {
    const winCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let combo of winCombos) {
      const [a,b,c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return `Winner: ${board[a]}`;
    }
    if (board.every(cell => cell)) return "It's a draw!";
    return '';
  }

  render();
};

// Placeholder for Snake Game
window.loadSnake = function() {
  const container = document.getElementById('game-container');
  container.innerHTML = `
    <h3>Snake (Coming soon!)</h3>
    <p>Snake game will be added here.</p>
  `;
};

btnGames.onclick = showGames;
btnBrowser.onclick = showBrowser;

// Initial load
showGames();
