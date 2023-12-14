// Factory function for players 
const Player = (name, symbol) => {
    return {
        getName: () => name,
        getSymbol: () => symbol,
    };
};


// Gameboard Module 
const GameBoard = (() => {
    let board = Array(9).fill(null);

    // Initialize the board with null values
    const initializeBoard = () => {
        board = Array(9).fill(null);
    };

    // add a player's symbol to the board 
    const dropToken = (player, index) => {
        if (board[index]=== null){
            board[index] = player.getSymbol();
            return true;
        }
        return false;
    };
    const checkWin = (player) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // winning rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], //winning columns
            [0, 4, 8], [2, 4, 6], // Winning diagonals
        ];
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return board[index] === player.getSymbol();
            });
        }); 
    }
    const isFull = () => {
        return board.every(cell => cell !== null);
    };
    const getBoard = () => {
        return [...baord];
    };

    return {
        initializeBoard,
        dropToken,
        checkWin,
        isFull,
        getBoard,
    };
})();


// const gameBoard = (function GameBoard() {
//     const rows = 4;
//     const columns = 4;
//     const board = [];
  
//     // Create a 2d array that will represent the state of the game board
//     // For this 2d array, row 1 will represent the top row and
//     // column 1 will represent the left-most column.
//     for (let i = 1; i < rows; i++) {
//       board[i] = [];
//       for (let j = 1; j < columns; j++) {
//         board[i].push(Cell());
//       }
//     }
//     const getBoard = () => board;

//     const dropToken = (column, rowVal, player) => {
//         const availableCells = board.filter((row) => 
//             row[column-1].getValue() === 0).map(row => row[column-1]);
//             //console.log(availableCells);
//         if (!availableCells.length){ 
//             //functionality to endGame
//             return;
//         }
//         board[rowVal][column-1].addToken(player)
//         console.log(board[rowVal][column-1].addToken(player)); 
//         if(checkWin(board, player.token)){

//             // update player score and end game since a player has won
//         }
//     }

//     // This method will be used to print our board to the console.
//     // It is helpful to see what the board looks like after each turn as we play,
//     // but we won't need it after we build our UI
//     const printBoard = () => {
//       const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
//       console.log(boardWithCellValues);
//     };
//     function checkWin(board, currentPlayer) {
//         // Check horizontal lines
//         for (let row = 1; row < 4; row++) {
//           console.log(board[row][1].getValue());  
//           if (
//             board[row][1] === currentPlayer &&
//             board[row][2] === currentPlayer &&
//             board[row][3] === currentPlayer
//           ) {
//             return true;
//           }
//         }
      
//         // Check vertical lines
//         for (let col = 1; col < 4; col++) {
//           if (
//             board[1][col] === currentPlayer &&
//             board[2][col] === currentPlayer &&
//             board[3][col] === currentPlayer
//           ) {
//             return true;
//           }
//         }
      
//         // Check diagonal lines
//         if (
//           (board[1][1].getValue() === currentPlayer && board[2][2] === currentPlayer && board[3][3] === currentPlayer) ||
//           (board[1][3].getValue() === currentPlayer && board[2][2] === currentPlayer && board[3][1] === currentPlayer)
//         ) {
//           return true;
//         }
      
//         return false;
//       }

//     return { getBoard, dropToken, printBoard, checkWin};
// })();

// function Cell() {
//     let value = 0;
  
//     // Accept a player's token to change the value of the cell
//     const addToken = (player) => {
//       value = player.token;
//     };
  
//     // How we will retrieve the current value of this cell through closure
//     const getValue = () => value;
  
//     return {
//       addToken,
//       getValue
//     };
//   }

// Module for the gameController  
const GameController = (() => {
    let players = [];
    let currentPlayerIndex = 0;

    const initializeGame = (player1, player2) => {
        players = [player1, player2];
        currentPlayerIndex = 0;
        GameBoard.initializeBoard();
        DisplayController.updateStatus(`${getCurrentPlayer().getName()}'s turn`);
        DisplayController.renderBoard();
    };

    const getCurrentPlayer = () => players[currentPlayerIndex];

    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };

    const handleMove = (index) => {
        if (Gameboard.makeMove(getCurrentPlayer(), index)) {
            DisplayController.renderBoard();

            if (Gameboard.checkWin(getCurrentPlayer())){
                DisplayController.showResult(`${getCurrentPlayer().getName()} wins!`);
                return;
            }
            
            if (Gameboard.isFull()){
                DisplayController.showResult("It's a tie");
                return;
            }
            
            switchPlayer();
            DisplayController.updateStatus(`${getCurrentPlayer().getName()}'s turn`);
            
        }
    };

    return {
        initializeGame,
        handleMove,
    };

})();






// function GameController(
//     playerOneName = "Player One",
//     playerTwoName = "Player Two"
//   ) {
//     let round = 1;
//     let isOver = false;
//     const board = gameBoard;
  
//     const players = [
//       {
//         name: playerOneName,
//         token: 1,
//         score: 0
//       },
//       {
//         name: playerTwoName,
//         token: 2,
//         score: 0
//       }
//     ];
  
//     let activePlayer = players[0];
  
//     const switchPlayerTurn = () => {
//       activePlayer = activePlayer === players[0] ? players[1] : players[0];
//       return activePlayer.token;
//     };
//     const getActivePlayer = () => activePlayer;
  
//     const printNewRound = () => {
//       board.printBoard();
//       console.log(`${getActivePlayer().name}'s turn.`);
//     };
  
//     const playRound = (column, row) => {
//       // Drop a token for the current player
//       console.log(
//         `Dropping ${getActivePlayer().name}'s token into column ${column} and row ${row}...`
//       );
//       board.dropToken(column, row, getActivePlayer().token);
  
//       /*  This is where we would check for a winner and handle that logic,
//           such as a win message. */
//       // Check for a win
//       if (checkWin(board.getBoard(), getActivePlayer().token)) {
//         console.log("A win exists")
//         console.log(`${getActivePlayer().name} wins!`);
//         return;
//       }
  
//       // Check for a draw
//       if (isBoardFull()) {
//         console.log("It's a draw!");
//         return;
//       }
  
//       // Switch player turn
//       switchPlayerTurn();
//       printNewRound();
//     };
//     const isBoardFull = () => {
//         const gameBoard = board.getBoard();
//         for (const row of gameBoard) {
//           for (const cell of row) {
//             if (cell.getValue() === 0) {
//               return false;
//             }
//           }
//         }
//         return true;
//       };
  
//     // For the console version, we will only use playRound, but we will need
//     // getActivePlayer for the UI version, so I'm revealing it now
//     return {
//       playRound,
//       getActivePlayer,
//       switchPlayerTurn
//     };
// }

const displayController = (()=>{
    const boardItem = document.querySelectorAll(".g-item");
    const turnMsge = document.getElementById("turn");
    const p1Score = document.getElementById("p1-score");
    const p2Score = document.getElementById("p2-score");
    const msgDisplay = document.getElementById("win-msge");
    const restartBtn = document.getElementById("restart");
    const replayBtn = document.getElementById("replay");

    boardItem.forEach((item) => {
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