pragma circom 2.0.8;

template sudoku() {
    signal input puzzle[81];
    signal input solution[81];

    puzzle[0] === 0;
}

component main {public [puzzle]} = soduku();