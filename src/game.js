// import board
let Board = require('./board');

class Game {
  constructor() {
    this.board = new Board();
    this.setUpBoard();
  }

  // set up format of board to DOM HTML
  setUpBoard() {
    const grid = document.createElement("div");
    grid.id = "grid-container";

    for (let rowIdx = 0; rowIdx < this.board.grid.length; rowIdx++) {
      let row = document.createElement("div");
      row.className = `row row-${rowIdx}`;

      for (let colIdx = 0; colIdx < this.board.grid[rowIdx].length; colIdx++) {
        let square = document.createElement("div");
        square.className = `square square-${rowIdx}-${colIdx}`;
        row.appendChild(square);
      }

      grid.appendChild(row);
    }

    document.getElementById("board").appendChild(grid);
  }

  crushRows(board, done) {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length - 2; col++) {
          // three in a row window
          let num1 = Math.abs(board[row][col]);
          let num2 = Math.abs(board[row][col + 1]);
          let num3 = Math.abs(board[row][col + 2]);
          if (num1 === num2 && num2 === num3 && num1 !== 0) {
              board[row][col] = -num1;
              board[row][col + 1] = -num2;
              board[row][col + 2] = -num3;
              done = true;
          }
      }
    }
    return done;
  }

  crushColumns(board, done) {
    for (let col = 0; col < board[0].length; col++) {
      for (let row = 0; row < board.length - 2; row++) {
          // three in a column
          let num1 = Math.abs(board[row][col]);
          let num2 = Math.abs(board[row + 1][col]);
          let num3 = Math.abs(board[row + 2][col]);
          if (num1 === num2 && num2 === num3 && num1 !== 0) {
              board[row][col] = -num1;
              board[row + 1][col] = -num2;
              board[row + 2][col] = -num3;
              done = true;
          }
      }
    }
    return done;
  }

  gravity(board) {
    for (let col = 0; col < board[0].length; col++) {
        let idx = board.length - 1;
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][col] > 0) {
                board[idx][col] = board[row][col];
                idx -= 1;
            }
        }
        
        // turn the rest of the empty column blocks into 0
        while (idx >= 0) {
            board[idx][col] = 0;
            idx--;
        }
    }
  }

  crushOrbs(board) {
    // board cannot be crushed and is in equilibrium
    let keepCrushing = false; 
    // crush the rows
    keepCrushing = this.crushRows(board, keepCrushing);
    // crush the columns
    keepCrushing = this.crushColumns(board,  keepCrushing);
    // gravity
    this.gravity(board);
    return  keepCrushing ? this.crushOrbs(board) : board;
  }

}



module.exports = Game;