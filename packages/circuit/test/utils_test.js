const chai = require("chai");
const path = require("path");
const { generateTestData } = require("./test_data");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("GetNumberGroupForRow() test", function () {
  it("Test case: board = [1~81], row index = 1, result = [10~18]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "get_number_group_for_row.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      {
        board: Array(81)
          .fill()
          .map((_, i) => i + 1),
      },
      true
    );

    //   console.log('witness', witness);
    let expectedResult = [10, 11, 12, 13, 14, 15, 16, 17, 18];
    for (i = 0; i < 9; i++) {
      assert(Fr.eq(Fr.e(witness[1 + i]), Fr.e(expectedResult[i])));
    }
  });
});

describe("GetNumberGroupForColumn() test", function () {
  it("Test case: board = [1~81], column index = 1, result = [2,11,...,74]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "get_number_group_for_column.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      {
        board: Array(81)
          .fill()
          .map((_, i) => i + 1),
      },
      true
    );

    //   console.log('witness', witness);
    let expectedResult = [2, 11, 20, 29, 38, 47, 56, 65, 74];
    for (i = 0; i < 9; i++) {
      assert(Fr.eq(Fr.e(witness[1 + i]), Fr.e(expectedResult[i])));
    }
  });
});

describe("GetNumberGroupForBox() test", function () {
  it("Test case: board = [1~81], box index = 1, result = [4,5,6,13,14,15,22,23,24]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "get_number_group_for_box.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      {
        board: Array(81)
          .fill()
          .map((_, i) => i + 1),
      },
      true
    );

    //    console.log('witness', witness);
    let expectedResult = [4, 5, 6, 13, 14, 15, 22, 23, 24];
    for (i = 0; i < 9; i++) {
      assert(Fr.eq(Fr.e(witness[1 + i]), Fr.e(expectedResult[i])));
    }
  });
});

describe("IsNumberInRange() test", function () {
  it("In range test: range = [0~9], number = 5", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_number_in_range.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness({ number: 5 }, true);

    //   console.log('witness', witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it("Out of range test: range = [0~9], number = 15", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_number_in_range.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness({ number: 15 }, true);

    //   console.log('witness', witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});

describe("IsValidSolutionNumberGroup() test", function () {
  it("Valid group test: numberGroup = [1, 3, 2, 9, 7, 5, 6, 4, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 3, 2, 9, 7, 5, 6, 4, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it("Invalid group test with duplicated numbers: numberGroup = [1, 1, 2, 9, 7, 5, 6, 4, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 1, 2, 9, 7, 5, 6, 4, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });

  it("Invalid group test with out-of-range number: numberGroup = [1, 11, 2, 9, 7, 5, 6, 4, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 11, 2, 9, 7, 5, 6, 4, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});

describe("IsValidPuzzleNumberGroup() test", function () {
  it("Valid group test: numberGroup = [1, 0, 2, 0, 0, 5, 6, 0, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_puzzle_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 0, 2, 0, 0, 5, 6, 0, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it("Invalid group test with duplicated numbers: numberGroup = [1, 0, 1, 0, 0, 5, 6, 0, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_puzzle_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 0, 1, 0, 0, 5, 6, 0, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });

  it("Invalid group test with out-of-range number: numberGroup = [1, 0, 11, 0, 0, 5, 6, 0, 8]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_puzzle_number_group.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { numberGroup: [1, 0, 11, 0, 0, 5, 6, 0, 8] },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});

describe("IsValidPuzzle() test", function () {
  let testData = generateTestData();
  let validPuzzle = testData.validPuzzle;

  it(`Valid puzzle test: puzzle = ${validPuzzle}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_puzzle.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { puzzle: validPuzzle },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it("Invalid puzzle test: puzzle = [1~9,1~9,...]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_puzzle.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { puzzle: Array(81).fill().map((_, i) => (i % 9) + 1) },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});

describe("IsValidSolution() test", function () {
  let testData = generateTestData();
  let validSolution = testData.validSolution;

  it(`Valid solution test: solution = ${validSolution}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { solution: validSolution },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it("Invalid solution test: solution = [1~9,1~9,...]", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { solution: Array(81).fill().map((_, i) => (i % 9) + 1) },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});

describe("IsValidSolutionOfPuzzle() test", function () {
  let testData = generateTestData();
  let validPuzzle = testData.validPuzzle;
  let validSolution = testData.validSolution;
  let invalidSolution = testData.invalidSolution;
  
  it(`Valid solution test: solution = ${validSolution}, puzzle = ${validPuzzle}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution_of_puzzle.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { solution: validSolution, puzzle: validPuzzle },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it(`Invalid solution test: solution = ${invalidSolution}, puzzle = ${validPuzzle}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "circuits", "is_valid_solution_of_puzzle.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { solution: invalidSolution, puzzle: validPuzzle },
      true
    );

    // console.log("witness", witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});
