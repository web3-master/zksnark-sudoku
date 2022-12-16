import { Button, Card, Col, Row, Typography } from "antd";
import ProofView from "./ProofView";
import PuzzleView from "./PuzzleView";

export default function PlayPannel() {
  return (
    <>
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>Play</Typography.Title>
        </Col>
      </Row>
      <Card title="Puzzle">
        <PuzzleView />
        <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
          <Col>
            <Button type="primary">New Puzzle</Button>
          </Col>
          <Col>
            <Button type="primary">Save Puzzle</Button>
          </Col>
          <Col>
            <Button type="primary">Load Puzzle</Button>
          </Col>
          <Col>
            <Button type="primary">Erase</Button>
          </Col>
        </Row>
      </Card>
      <Card title="Proof" style={{ marginTop: 10 }}>
        <ProofView disabled={false} />
        <Row gutter={20} justify="center" style={{ marginTop: 10 }}>
          <Col>
            <Button type="primary">Generate Proof</Button>
          </Col>
          <Col>
            <Button type="primary">Save Proof</Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
