import { Input } from 'antd';

interface Props {
  proof: string;
  disabled: boolean;
}

const ProofView: React.FC<Props> = ({ proof, disabled }) => {
  return <Input.TextArea rows={5} disabled={disabled} value={proof} />;
};

export default ProofView;
