class Board {
  constructor() {
    this.grid = Board.makeGrid();
  }

  static makeGrid() {
    const grid = Array.from(new Array(10), () => new Array(10).fill(null));
    return grid;
  }

  // check if grid is empty

  // clear board
  clearBoard() {
    this.grid = Array.from(new Array(10), () => new Array(10).fill(null));
  }
  
  // last empty position above

  // last empty position below

  // last empty position left

  // last empty position right

}

module.exports = Board;
