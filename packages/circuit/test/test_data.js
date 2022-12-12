const sudoku = require('sudoku');

function postprocessBoard(board) {
    return board.map((number, _) => number === null ? 0 : number + 1);
  }
  
function generateTestData() {
    let validPuzzle;
    let validSolution;
    let invalidSolution;

    puzzle = sudoku.makepuzzle();
    solution = sudoku.solvepuzzle(puzzle);
    validPuzzle = postprocessBoard(puzzle);
    validSolution = postprocessBoard(solution);
    invalidSolution = [...validSolution];
    invalidSolution[0] = invalidSolution[1];

    return {validPuzzle, validSolution, invalidSolution};
};

module.exports = { generateTestData: generateTestData };