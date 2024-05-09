// Import dependance, Export Solve function
const { generatePossibilitiesForRow } = require("./compute");
module.exports = { solveNonogram };

function solveNonogram(horizontalGrid, verticalGrid) {
  const numRows = horizontalGrid.length;
  const numCols = verticalGrid.length;

  // Generate all row + column possibilities
  const rowPossibilities = horizontalGrid.map((hints) =>
    generatePossibilitiesForRow(hints, numCols)
  );
  const columnPossibilities = verticalGrid.map((hints) =>
    generatePossibilitiesForRow(hints, numRows)
  );

  // Initialize an Empty grid
  let grid = Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(null));

  // Validate current grid against row and column possibilities
  function isValid(grid, rowPoss, colPoss) {
    for (let r = 0; r < numRows; r++) {
      if (
        !rowPoss[r].some((pattern) =>
          pattern
            .split("")
            .every(
              (val, idx) =>
                grid[r][idx] === null || grid[r][idx] === parseInt(val)
            )
        )
      )
        return false;
    }
    for (let c = 0; c < numCols; c++) {
      let column = grid.map((row) => row[c]);
      if (
        !colPoss[c].some((pattern) =>
          pattern
            .split("")
            .every(
              (val, idx) =>
                column[idx] === null || column[idx] === parseInt(val)
            )
        )
      )
        return false;
    }
    return true;
  }

  // Recursive function to solve grid
  function backtrack(row, col) {
    if (col == numCols) {
      row++;
      col = 0;
    }
    if (row == numRows) {
      return isValid(grid, rowPossibilities, columnPossibilities);
    }

    // Tries each possible value for the current cell
    for (let num of [0, 1]) {
      grid[row][col] = num;
      if (
        isValid(grid, rowPossibilities, columnPossibilities) &&
        backtrack(row, col + 1)
      ) {
        return true;
      }
      grid[row][col] = null;
    }

    return false;
  }
  return backtrack(0, 0);
}
