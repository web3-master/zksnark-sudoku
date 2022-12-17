import { makepuzzle, solvepuzzle } from "sudoku";

function nullToZero(board: number[]) {
  return board.map((number, _) => (number === null ? 0 : number + 1));
}

function zeroToNull(board: number[]) {
  return board.map((number, _) => (number === 0 ? null : number - 1));
}

export function generatePuzzle(): number[] {
  let puzzle = makepuzzle();
  return nullToZero(puzzle);
}

export function getSolutionOfPuzzle(puzzle: number[]): number[] {
  let solution = solvepuzzle(zeroToNull(puzzle));
  return nullToZero(solution);
}
