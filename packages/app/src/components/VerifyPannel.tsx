import { Button, Card, Col, Row, Typography } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import ProofView from "./ProofView";
import PuzzleView from "./PuzzleView";

export default function VerifyPannel() {
  const [puzzle, setPuzzle] = useState<number[]>(Array(81).fill(0));
  const [proof, setProof] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const puzzleFile = useRef(null);
  const proofFile = useRef(null);

  const onLoadPuzzle = () => {
    if (puzzleFile.current != null) puzzleFile.current.click();
    setVerified(false);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(event.target);
    console.log(puzzleFile.current);
    if (event.target.files != null) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target != null) {
          const fileContent = JSON.parse(e.target.result as string);
          if (event.target == puzzleFile.current) setPuzzle(fileContent);
          else if (event.target == proofFile.current) setProof(fileContent);
        }
      };
      fileReader.readAsText(file, "UTF-8");
    }
  };

  const onLoadProof = () => {
    setVerified(false);
    if (proofFile.current != null) proofFile.current.click();
  };

  const onVerifyProof = () => {
    alert("You solved this puzzle!");
    setVerified(true);
  };

  return (
    <>
      <input
        type="file"
        id="puzzleFile"
        ref={puzzleFile}
        style={{ display: "none" }}
        onChange={onFileSelected}
      />
      <input
        type="file"
        id="proofFile"
        ref={proofFile}
        style={{ display: "none" }}
        onChange={onFileSelected}
      />
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>VERIFY</Typography.Title>
        </Col>
      </Row>
      <Card title="Puzzle">
        <PuzzleView puzzle={puzzle} />
        <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
          <Col>
            <Button type="primary" onClick={onLoadPuzzle}>
              Load Puzzle
            </Button>
          </Col>
        </Row>
      </Card>
      <Card
        title={verified ? "Proof - YOU SOLVED THE PUZZLE!" : "Proof"}
        style={{ marginTop: 10 }}
      >
        <ProofView proof={proof} disabled={false} />
        <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
          <Col>
            <Button type="primary" onClick={onLoadProof}>
              Load Proof
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={onVerifyProof}>
              Verify Proof
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
