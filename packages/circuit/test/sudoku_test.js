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

describe("Sudoku test", function () {
  let testData = generateTestData();
  let validPuzzle = testData.validPuzzle;
  let validSolution = testData.validSolution;
  let invalidSolution = testData.invalidSolution;

  it(`Valid puzzle, valid solution test: puzzle = ${validPuzzle}, solution = ${validSolution}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "../circuits", "sudoku.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { puzzle: validPuzzle, solution: validSolution },
      true
    );

    // console.log('witness', witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(1)));
  });

  it(`Valid puzzle, invalid solution test: puzzle = ${validPuzzle}, solution = ${invalidSolution}`, async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "../circuits", "sudoku.circom"),
      { output: path.join(__dirname, "../build") }
    );

    const witness = await circuit.calculateWitness(
      { puzzle: validPuzzle, solution: invalidSolution },
      true
    );

    // console.log('witness', witness);
    assert(Fr.eq(Fr.e(witness[1]), Fr.e(0)));
  });
});
