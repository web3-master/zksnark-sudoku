import { Col, InputNumber, Row, theme } from "antd";
import { CELL_SIZE } from "../Constants";

export default function PuzzleView() {
  const board: Array<number> = Array(81).fill(0);
  const boardSize = CELL_SIZE * 9 + 100;

  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {[0, 1, 2].map((row) => (
        <Row justify="center">
          {[0, 1, 2].map((col) => (
            <Col>
              <Box box={Array(9).fill(3)} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
}

interface BoxProps {
  box: Array<number>;
}
const Box: React.FC<BoxProps> = ({ box }) => {
  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {[0, 1, 2].map((row) => (
        <Row>
          {[0, 1, 2].map((col) => (
            <Col>
              <Cell value={box[row * 3 + col]} />
            </Col>
          ))}
        </Row>
      ))}
    </div>
  );
};

interface CellProps {
  value: number;
  disabled?: boolean;
}
const Cell: React.FC<CellProps> = ({ value, disabled = false }) => {
  return (
    <InputNumber
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
      }}
      min={1}
      max={9}
      disabled={disabled}
      defaultValue={value}
    />
  );
};
