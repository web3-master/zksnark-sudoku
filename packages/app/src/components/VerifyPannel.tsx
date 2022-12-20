import { Button, Card, Col, message, Row, Spin, Typography } from "antd";
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

  const isValidPuzzleData = (puzzleData: any): boolean => {
    return Array.isArray(puzzleData) && puzzleData.length == 81;
  };

  const isValidProofData = (proofData: any): boolean => {
    return (
      "pi_a" in proofData &&
      "pi_b" in proofData &&
      "pi_c" in proofData &&
      "protocol" in proofData &&
      "curve" in proofData &&
      proofData.protocol === "groth16" &&
      proofData.curve === "bn128"
    );
  };

  const onLoadPuzzle = () => {
    if (puzzleFile.current != null) puzzleFile.current.click();
    setVerified(false);
  };

  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    event.preventDefault();
    if (event.target.files != null && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target != null) {
          try {
            const fileContent = JSON.parse(e.target.result as string);
            if (event.target == puzzleFile.current) {
              if (isValidPuzzleData(fileContent)) {
                setPuzzle(fileContent);
              } else {
                messageApi.error("Selected file is not valid puzzle file!");
              }
            } else if (event.target == proofFile.current) {
              if (isValidProofData(fileContent)) {
                setProof(JSON.stringify(fileContent));
              } else {
                messageApi.error("Selected file is not valid proof file!");
              }
            }
          } catch (error) {
            messageApi.error("You selected wrong file!");
          }
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
    if (proof === "") {
      messageApi.error("Please select your proof file!");
      return;
    }

    const vkey = await fetch("sudoku_verify_key.json").then((res) => {
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
