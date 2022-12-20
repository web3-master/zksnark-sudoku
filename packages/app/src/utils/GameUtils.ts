import { makepuzzle, solvepuzzle } from 'sudoku';

function nullToZero(board: number[]) {
  return board.map((number) => (number === null ? 0 : number + 1));
}

function zeroToNull(board: number[]) {
  return board.map((number) => (number === 0 ? null : number - 1));
}

export function generatePuzzle(): number[] {
  const puzzle = makepuzzle();
  return nullToZero(puzzle);
}

export function getSolutionOfPuzzle(puzzle: number[]): number[] {
  const solution = solvepuzzle(zeroToNull(puzzle));
  return nullToZero(solution);
}
