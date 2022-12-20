import { Button, Card, Col, Row, Spin, Typography, message } from 'antd';
import React, { useState } from 'react';
import { generatePuzzle, getSolutionOfPuzzle } from '../utils/GameUtils';
import KeyboardView from './KeyboardView';
import ProofView from './ProofView';
import PuzzleView from './PuzzleView';

const PlayPannel: React.FC = () => {
  const [puzzle, setPuzzle] = useState<number[]>(Array(81).fill(0));
  const [solution, setSolution] = useState<number[]>(Array(81).fill(0));
  const [selectedCellIndex, setSelectedCellIndex] = useState<number>(-1);

  const [proof, setProof] = useState<string>('');
  const [proofCalculating, setProofCalculating] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onKeyButtonClick = (value: number) => {
    if (selectedCellIndex == -1) return;
    if (puzzle[selectedCellIndex] > 0) return;

    const newSolution = [...solution];
    newSolution[selectedCellIndex] = value;
    setSolution(newSolution);
  };

  const onCellClick = (index: number) => {
    setSelectedCellIndex(index);
  };

  const onNewPuzzle = () => {
    const newPuzzle = generatePuzzle();
    setPuzzle(newPuzzle);
    setSolution(Array(81).fill(0));
    setSelectedCellIndex(-1);
  };

  const onSolvePuzzle = () => {
    const solution = getSolutionOfPuzzle(puzzle);
    setSolution(solution);
  };

  const onEraseSolution = () => {
    setSolution(Array(81).fill(0));
    setSelectedCellIndex(-1);
  };

  const onSavePuzzle = () => {
    const puzzleData = JSON.stringify(puzzle);
    const blob = new Blob([puzzleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'puzzle.json';
    link.href = url;
    link.click();
  };

  const onGenerateProof = async () => {
    const input = {
      puzzle: puzzle,
      solution: solution,
    };

    setProofCalculating(true);

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      input,
      'sudoku.wasm',
      'sudoku_1.zkey'
    );

    setProofCalculating(false);

    const circuitOutputSignal = publicSignals[0];
    if (circuitOutputSignal === '1') {
      setProof(JSON.stringify(proof));
      messageApi.success(
        'Your proof is generated. You can make sure others that you have solved this puzzle without sharing solution.',
        5
      );
    } else {
      messageApi.error(
        "Your solution isn't correct. Please solve the puzzle correctly!",
        5
      );
    }
  };

  const onSaveProof = () => {
    if (proof === '') {
      messageApi.error('Please generate proof for your solution!');
      return;
    }

    const blob = new Blob([proof], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'proof.json';
    link.href = url;
    link.click();
  };

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>PLAY</Typography.Title>
        </Col>
      </Row>
      <Spin spinning={proofCalculating} tip="Proof generating..." size="large">
        <Card title="Puzzle">
          <Row>
            <Col span={20}>
              <PuzzleView
                puzzle={puzzle}
                solution={solution}
                selectedCellIndex={selectedCellIndex}
                onCellClick={onCellClick}
              />
            </Col>
            <Col span={4}>
              <KeyboardView onButtonClick={onKeyButtonClick} />
            </Col>
          </Row>
          <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
            <Col>
              <Button type="primary" onClick={onNewPuzzle}>
                New Puzzle
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onSolvePuzzle}>
                Solve Puzzle
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onEraseSolution}>
                Erase Solution
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onSavePuzzle}>
                Save Puzzle
              </Button>
            </Col>
          </Row>
        </Card>
        <Card title="Proof" style={{ marginTop: 10 }}>
          <ProofView proof={proof} disabled={true} />
          <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
            <Col>
              <Button type="primary" onClick={onGenerateProof}>
                Generate Proof
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={onSaveProof}>
                Save Proof
              </Button>
            </Col>
          </Row>
        </Card>
      </Spin>
    </>
  );
};

export default PlayPannel;
