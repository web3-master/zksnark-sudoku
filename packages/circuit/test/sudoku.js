const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString(
  "21888242871839275222246405745257275088548364400416034343698204186575808495617"
);
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Sudoku test", function () {
  it("Test case1", async () => {
    const circuit = await wasm_tester(
      path.join(__dirname, "../circuits", "sudoku.circom"),
      {output: path.join(__dirname, "../build")}
    );
    await circuit.loadConstraints();
    console.log('circuit', circuit);

    const witness = await circuit.calculateWitness(
      { puzzle: [10, 20], solution: [11, 21] },
      true
    );

    console.log('witness', witness);
  });
});
