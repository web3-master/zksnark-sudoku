import { Input } from "antd";

interface Props {
  disabled: boolean;
}

const ProofView: React.FC<Props> = ({ disabled }) => {
  return <Input.TextArea rows={5} disabled={disabled} />;
};

export default ProofView;
