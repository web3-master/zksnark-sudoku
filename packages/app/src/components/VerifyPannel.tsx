import { Button, Col, Row, Typography } from "antd";

export default function VerifyPannel() {
  return (
    <>
      <Row justify="center">
        <Col>
          <Typography.Title level={3}>Verify</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>Puzzle:</Col>
        <Col flex={1}>Board...</Col>
        <Col flex={1}>
          <Button type="primary">Load Puzzle</Button>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>Proof:</Col>
        <Col flex={1}>Proof content...</Col>
        <Col flex={1}>
          <Button type="primary">Load Proof</Button>
          <br />
          <Button type="primary">Verify</Button>
        </Col>
      </Row>
      <Row>
        <Col flex={1}>Result:</Col>
        <Col flex={1}>Solved!</Col>
      </Row>
    </>
  );
}
