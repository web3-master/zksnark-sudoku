pragma circom 2.0.8;

template sudoku() {
    signal input puzzle[2];
    signal input solution[2];

    for (var i = 0; i < 2; i++) {
        solution[i] === puzzle[i] + 1;
    }
}

component main {public [puzzle]} = sudoku();