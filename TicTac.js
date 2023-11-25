

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
  }

function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];
  
    // Create a 2d array that will represent the state of the game board
    // For this 2d array, row 0 will represent the top row and
    // column 0 will represent the left-most column.
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      }
    }
    const getBoard = () => board;

    const dropToken = (column, rowVal, player) => {
        const availableCells = board.filter((row) => 
            row[column].getValue() === 0).map(row => row[column]);
        if (!availableCells.length) return;
        board[rowVal][column].addToken(player); 
    }

    // This method will be used to print our board to the console.
    // It is helpful to see what the board looks like after each turn as we play,
    // but we won't need it after we build our UI
    const printBoard = () => {
      const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
      console.log(boardWithCellValues);
    };
    
    return { getBoard, dropToken, printBoard };
}


function GameController(
  ) {
    playerOne = new Player("Player One", X)
    playerTwo = new Player("Player Two", O)
    const board = GameBoard();
  }