module.exports = { displayPossibilitiesList, generatePossibilitiesForRow };

// Listing Possibilities
function calculateComplexity(hints) {
  const totalBlocks = hints.reduce((sum, current) => sum + current, 0);
  const minimumLength = totalBlocks + hints.length - 1;
  return minimumLength;
}

function listPossibilitiesForRow(grid) {
  return grid.map((hints, index) => ({
    index,
    complexity: calculateComplexity(hints),
    possibilities: generatePossibilitiesForRow(hints, grid.length),
    hints,
  }));
}

// Display and JSONify output
function displayPossibilitiesList(grid) {
  const ranked = listPossibilitiesForRow(grid, grid.length);
  const result = ranked.map((row) => ({
    index: row.index,
    complexity: row.complexity,
    possibilitiesCount: row.possibilities.length,
    hints: row.hints,
    possibilities: row.possibilities,
  }));
  console.log(JSON.stringify(result, null, 2));
}

// Compute possibilities 0 = Empty, 1 = Full
function generatePossibilitiesForRow(hints, length) {
  const possibilities = [];

  function recurse(possibility, hintIndex, position) {
    if (hintIndex >= hints.length) {
      if (position === length) {
        possibilities.push(possibility.join(""));
      } else {
        // Fill the remaining positions with zeros if not at the end of the row
        possibility.fill(0, position);
        possibilities.push(possibility.join(""));
      }
      return;
    }

    const hint = hints[hintIndex];
    const remainingHints = hints.slice(hintIndex + 1);
    const maxPosition =
      length -
      remainingHints.reduce((acc, h) => acc + h, hint) -
      remainingHints.length;

    for (let start = position; start <= maxPosition; start++) {
      const newPossibility = [...possibility];
      if (start > position) newPossibility.fill(0, position, start);
      newPossibility.fill(1, start, start + hint);
      if (hintIndex === hints.length - 1 && start + hint < length) {
        newPossibility.fill(0, start + hint, length);
      }
      recurse(newPossibility, hintIndex + 1, start + hint + 1);
    }
  }

  recurse(new Array(length).fill(0), 0, 0);
  return possibilities;
}
