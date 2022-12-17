import { Button, Col, Row } from "antd";
import { CELL_SIZE } from "../Constants";

interface PuzzleViewProps {
  puzzle: number[];
  solution?: number[];
  selectedCellIndex?: number;
  onCellClick?: (index: number) => void;
}

const PuzzleView: React.FC<PuzzleViewProps> = ({
  puzzle,
  solution = Array(81).fill(0),
  selectedCellIndex = -1,
  onCellClick = undefined,
}) => {
  return (
    <div
      style={{
        padding: 2,
      }}
    >
      {Array(9)
        .fill(0)
        .map((_, row) => (
          <Row key={row} justify="center">
            {Array(9)
              .fill(0)
              .map((_, col) => {
                const index = row * 9 + col;
                return (
                  <Col key={index}>
                    <Cell
                      value={
                        puzzle[index] == 0 ? solution[index] : puzzle[index]
                      }
                      index={index}
                      selected={selectedCellIndex == index}
                      disabled={puzzle[index] > 0}
                      onClick={onCellClick}
                    />
                  </Col>
                );
              })}
          </Row>
        ))}
    </div>
  );
};

interface CellProps {
  value: number;
  index: number;
  selected: boolean;
  disabled?: boolean;
  onClick?: (index: number) => void;
}
const Cell: React.FC<CellProps> = ({
  value,
  index,
  selected,
  disabled = false,
  onClick = undefined,
}) => {
  const row = Math.floor(index / 9);
  const col = index % 9;
  return (
    <Button
      style={{
        width: CELL_SIZE,
        height: CELL_SIZE,
        marginLeft: col == 3 || col == 6 ? 4 : 0,
        marginTop: row == 3 || row == 6 ? 4 : 0,
      }}
      type={selected ? "primary" : "default"}
      disabled={disabled}
      onClick={() => {
        if (onClick != undefined) onClick(index);
      }}
    >
      {value > 0 ? value : ""}
    </Button>
  );
};

export default PuzzleView;
