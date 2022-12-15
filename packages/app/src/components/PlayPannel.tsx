import { Button, Col, Row, Typography } from "antd";

export default function PlayPannel() {
  return (
    <>
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>Play</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>Game:</Col>
        <Col flex={1}>Board...</Col>
        <Col flex={1}>
          <Button type="primary">New Puzzle</Button>
          <br />
          <Button type="primary">Save Puzzle</Button>
          <br />
          <Button type="primary">Load Puzzle</Button>
          <br />
          <Button type="primary">Erase</Button>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>Proof:</Col>
        <Col flex={1}>Proof content...</Col>
        <Col flex={1}>
          <Button type="primary">Generate Proof</Button>
          <br />
          <Button type="primary">Save Proof</Button>
        </Col>
      </Row>
    </>
  );
}
