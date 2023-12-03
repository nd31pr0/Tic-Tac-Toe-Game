

const gameBoard = (function GameBoard() {
    const rows = 4;
    const columns = 4;
    const board = [];
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for (let i = 1; i < rows; i++) {
      board[i] = [];
      for (let j = 1; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    const getBoard = () => board;

    const dropToken = (column, rowVal, player) => {
        const availableCells = board.filter((row) => 
            row[column-1].getValue() === 0).map(row => row[column-1]);
            console.log(availableCells);
        if (!availableCells.length) return;
        board[rowVal][column-1].addToken(player); 
    }

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
    const checkWin = () => {
        const winningCombinations = [
          // Rows
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          // Columns
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          // Diagonals
          [0, 4, 8],
          [2, 4, 6]
        ];
    
        for (const combination of winningCombinations) {
          const [a, b, c] = combination;
          const cellA = getCell(a);
          const cellB = getCell(b);
          const cellC = getCell(c);
    
          if (cellA && cellB && cellC && cellA.getValue() !== 0 && cellA.getValue() === cellB.getValue() && cellA.getValue() === cellC.getValue()) {
            return true;
          }
        }
    
        return false;
      };
    
      const getCell = (index) => {
        const row = Math.floor(index / 3);
        const column = index % 3;
        return board[row][column];
      };

    return { getBoard, dropToken, printBoard, checkWin};
})();

function Cell() {
    let value = 0;
  
    // Accept a player's token to change the value of the cell
    const addToken = (player) => {
      value = player;
    };
  
    // How we will retrieve the current value of this cell through closure
    const getValue = () => value;
  
    return {
      addToken,
      getValue
    };
  }


function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
  ) {
    let round = 1;
    let isOver = false;
    const board = gameBoard;
  
    const players = [
      {
        name: playerOneName,
        token: 1
      },
      {
        name: playerTwoName,
        token: 2
      }
    ];
  
    let activePlayer = players[0];
  
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      return activePlayer.token;
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      board.printBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };
  
    const playRound = (column, row) => {
      // Drop a token for the current player
      console.log(
        `Dropping ${getActivePlayer().name}'s token into column ${column} and row ${row}...`
      );
      board.dropToken(column, row, getActivePlayer().token);
  
      /*  This is where we would check for a winner and handle that logic,
          such as a win message. */
      // Check for a win
      if (board.checkWin()) {
        console.log(`${getActivePlayer().name} wins!`);
        return;
      }
  
      // Check for a draw
      if (isBoardFull()) {
        console.log("It's a draw!");
        return;
      }
  
      // Switch player turn
      switchPlayerTurn();
      printNewRound();
    };
    const isBoardFull = () => {
        const gameBoard = board.getBoard();
        for (const row of gameBoard) {
          for (const cell of row) {
            if (cell.getValue() === 0) {
              return false;
            }
          }
        }
        return true;
      };
  
    // For the console version, we will only use playRound, but we will need
    // getActivePlayer for the UI version, so I'm revealing it now
    return {
      playRound,
      getActivePlayer,
      switchPlayerTurn
    };
}

const displayController = (()=>{
    const boardItem = document.querySelectorAll(".g-item");
    const turnMsge = document.getElementById("turn");
    const p1Score = document.getElementById("p1-score");
    const p2Score = document.getElementById("p2-score");
    const msgDisplay = document.getElementById("win-msge");
    const restartBtn = document.getElementById("restart");
    const replayBtn = document.getElementById("replay");

    boardItem.forEach((item) => {
        console.log(item);
        item.addEventListener("click", (e) => {
          const cellId = parseInt(e.target.id);
          console.log(cellId)
          if (cellId == 1 || cellId == 4 || cellId == 7){
            column = 1;
          }
          else if (cellId == 2 || cellId == 5 || cellId == 8){
            column = 2
          }
          else if (cellId == 3 || cellId == 6 || cellId == 9){
            column = 3;
          }
          if (cellId == 1 || cellId == 2 || cellId == 3){
            row = 1
          }
          else if (cellId == 3 || cellId == 4 || cellId == 5){
            row = 2
          }
          else {
            row = 3
          }
          const currentPlayer = gameController.getActivePlayer();
        if (document.getElementById(`${e.target.id}`).innerHTML === "") {
            gameBoard.dropToken(column, row, currentPlayer.token);
            console.log(`Dropping ${currentPlayer.name}'s token into column ${column} and row ${row}...`);
            document.getElementById(`${e.target.id}`).innerHTML = currentPlayer.token;
            const newTurn = gameController.switchPlayerTurn();
            turnMsge.innerHTML = newTurn;
        } else {
            console.log("Cell already occupied. Cannot drop token.");
        }
        });
      });
})();

// Test the game
const gameController = GameController("Player 1", "Player 2");
// gameController.playRound(0, 0);
// gameController.playRound(0, 1);
// gameController.playRound(1, 0);
// gameController.playRound(1, 1);
// gameController.playRound(2, 0);
// gameController.playRound(0, 2);
// gameController.playRound(1, 2);
// gameController.playRound(2, 1);
// gameController.playRound(2, 2);