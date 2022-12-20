import { Button, Col, Row } from 'antd';
import { CELL_SIZE } from '../Constants';

interface Props {
  onButtonClick: (value: number) => void;
}

const KeyboardView: React.FC<Props> = ({ onButtonClick }) => {
  return (
    <Row justify="center">
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <Col key={index} span={12}>
            <Button
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              onClick={() => onButtonClick(index + 1)}
            >
              {index + 1}
            </Button>
          </Col>
        ))}
      <Col span={12}>
        <Button
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
          onClick={() => onButtonClick(0)}
        >
          C
        </Button>
      </Col>
    </Row>
  );
};

export default KeyboardView;
