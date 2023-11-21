// We define a sudoku board as a 2D array of numbers from 1 to 9, where 0 represents an empty cell.
// We also validate if the sudoku is valid or not. (A valid sudoku is one where there are no duplicate numbers in a row, column or subgrid)
// We solve the sudoku using backtracking.



// Prints "Sudoku resuelto:" and the solved sudoku board if there is a solution.
function solveSudoku(board) {
  if (solve(board)) {
    console.log("Sudoku resuelto:");
    printBoard(board);
  } else {
    console.log("No hay solución para este Sudoku.");
  }
}


// Returns true if there is a solution for the sudoku board, false otherwise.
function solve(board) {
  const emptySpot = findEmptySpot(board);
  if (!emptySpot) {
    return true;
  }

  const [row, col] = emptySpot;
  // Try all numbers from 1 to 9
  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (solve(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
}

// Returns the coordinates of the first empty spot in the sudoku board, null if there are no empty spots.
function findEmptySpot(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return null;
}


// Returns true if the number num is valid in the sudoku board at the given row and column, false otherwise.
function isValid(board, row, col, num) {
  return (
    isRowValid(board, row, num) &&
    isColumnValid(board, col, num) &&
    isSubgridValid(board, row - (row % 3), col - (col % 3), num)
  );
}

// Returns true if the number num is valid in the sudoku board at the given row, false otherwise.
function isRowValid(board, row, num) {
  return !board[row].includes(num);
}

// Returns true if the number num is valid in the sudoku board at the given column, false otherwise.
function isColumnValid(board, col, num) {
  for (let row = 0; row < 9; row++) {
    if (board[row][col] === num) {
      return false;
    }
  }
  return true;
}

// Returns true if the number num is valid in the sudoku board at the given subgrid, false otherwise.
function isSubgridValid(board, startRow, startCol, num) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row + startRow][col + startCol] === num) {
        return false;
      }
    }
  }
  return true;
}

// Prints the sudoku board in the console.
function printBoard(board) {
  for (let row = 0; row < 9; row++) {
    console.log(board[row].join(" "));
  }
}


// Required sudoku board
const sudokuBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

solveSudoku(sudokuBoard);

// Render the Sudoku board in the browser
const container = document.createElement("div");
document.body.appendChild(container);

const title = document.createElement("h1");
title.textContent = "Sudoku Solution!";
container.appendChild(title);

const grid = document.createElement("table");
container.appendChild(grid);

for (let row = 0; row < 9; row++) {
  const tr = document.createElement("tr");
  grid.appendChild(tr);

  for (let col = 0; col < 9; col++) {
    const td = document.createElement("td");
    td.textContent = sudokuBoard[row][col];
    tr.appendChild(td);
  }
}
