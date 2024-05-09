// Import functions, file lib
const { displayPossibilitiesList } = require('./compute')
const { solveNonogram } = require('./solve')
const fs = require('fs');

// Load Nonograms example and parse it
const jsonData = fs.readFileSync('./src/15x15.json', 'utf8');
const gridData = JSON.parse(jsonData);

// Access the arrays from the loaded data
const horizontalGrid = gridData.horizontalGrid;
const verticalGrid = gridData.verticalGrid;

// Functions
// for Debugging - lists all possibilities
// Compute.js
console.log('Horizontal Possibilities List:');
displayPossibilitiesList(horizontalGrid);

console.log('Vertical Possibilities List:');
displayPossibilitiesList(verticalGrid);

// Solves nonogram - returns true if solvable
// Solve.js
console.log(solveNonogram(horizontalGrid, verticalGrid)); 
