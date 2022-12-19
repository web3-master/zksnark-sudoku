import { Button, Card, Col, Row, Typography, message, Spin } from "antd";
import { ChangeEvent, useRef, useState } from "react";
import ProofView from "./ProofView";
import PuzzleView from "./PuzzleView";

export default function VerifyPannel() {
  const [puzzle, setPuzzle] = useState<number[]>(Array(81).fill(0));
  const [proof, setProof] = useState<string>("");
  const [verified, setVerified] = useState<boolean>(false);

  const puzzleFile = useRef(null);
  const proofFile = useRef(null);
  const [verifying, setVerifying] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

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

  const onVerifyProof = async () => {
    const vkey = await fetch("sudoku_verify_key.json").then(res => {
      return res.json();
    });

    setVerifying(true);
    
    //
    // This first "1" is the circuit's output signal, which means the solution is correct.
    //
    const publicSignals = ["1", ...puzzle];
    const proofData = JSON.parse(proof);
    const res = await snarkjs.groth16.verify(vkey, publicSignals, proofData);
    
    setVerifying(false);

    if (res) {
      messageApi.success("Your proof is verified. You solved the puzzle.", 5);
    } else {
      messageApi.error("Your proof isn't correct.", 5);
    }
    setVerified(res);
  };

  return (
    <>
      {contextHolder}
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
      <Spin spinning={verifying} tip="Proof verifying..." size="large">
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
        <ProofView proof={proof} disabled={true} />
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
      </Spin>
    </>
  );
}
