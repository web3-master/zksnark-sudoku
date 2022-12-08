pragma circom 2.0.8;

include "circomlib/comparators.circom";
include "circomlib/gates.circom";

/**
 * Check if the puzzle is valid.
 */
template IsValidPuzzle() {
    signal input puzzle[81];
    signal output result;

    // TODO: some constraints of the checking logic.

    result <== 1;
}

/**
 * Check if the solution is complete and correct.
 */
template IsValidSolution() {
    signal input solution[81];
    signal output result;

    // TODO: some constraints of the checking logic.

    result <== 1;
}

/**
 * Check if the number is in range [from, to].(including from, to)
 */
template IsNumberInRange(from, to) {
    signal input number;
    signal output result;

    component greater = GreaterEqThan(4);
    component less = LessEqThan(4);

    greater.in[0] <== number;
    greater.in[1] <== from;

    less.in[0] <== number;
    less.in[1] <== to;

    component and = AND();
    and.a <== greater.out;
    and.b <== less.out;

    result <== and.out;
}

/**
 * Check if the number group is solved state.
 * All numbers are in range of [1~9].
 * No two numbers are duplicated in group.
 *
 * example: [1, 3, 2, 9, 7, 5, 6, 4, 8]
 */
template IsValidSolutionNumberGroup() {
    signal input numberGroup[9];
    signal output result;

    // TODO: some constraints of the checking logic.

    result <== 1;
}

/**
 * Check if the number group is valid for puzzle.
 * All numbers are in range of [0~9]. 0 means empty slot.
 * No two numbers are duplicated in group if they are not zero.
 *
 * example: [1, 0, 2, 0, 0, 5, 6, 0, 8]
 */
template IsValidPuzzleNumberGroup() {
    signal input numberGroup[9];
    signal output result;

    // TODO: some constraints of the checking logic.

    result <== 1;
}

/**
 * Check if the solution is matched with the puzzle.
 * example: solution: [1, 3, 2, 9, 7, 5, 6, 4, 8], puzzle: [1, 0, 0, 9, 0, 5, 0, 4, 8]
 */
template IsValidSolutionOfPuzzle() {
    signal input solution[81];
    signal input puzzle[81];
    signal output result;

    // TODO: some constraints of the checking logic.

    result <== 1;
}

/**
 * Get 9 numbers of the row.
 */
template GetNumberGroupForRow(index) {
    signal input board[81];
    signal output numberGroup[9];

    for (var i = 0; i < 9; i++) {
        numberGroup[i] <== board[index * 9 + i];
    }
}

/**
 * Get 9 numbers of the column.
 */
template GetNumberGroupForColumn(index) {
    signal input board[81];
    signal output numberGroup[9];

    for (var i = 0; i < 9; i++) {
        numberGroup[i] <== board[index + i * 9];
    }
}

/**
 * Get 9 numbers of the box.
 */
template GetNumberGroupForBox(index) {
    signal input board[81];
    signal output numberGroup[9];
    var boxStarts[9] = [0, 3, 6, 27, 30, 33, 54, 57, 60];

    for (var i = 0; i < 9; i++) {
        var position = boxStarts[index] + (i \ 3) * 9 + (i % 3);
        numberGroup[i] <== board[position];
    }
}