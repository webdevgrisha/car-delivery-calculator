import { useTableWrapperContext } from '../../tableWrapperContext';
import './FormulaInput.css';

interface FormulaInputProps {
  formula: string;
  rowName: string;
  setFormula: (value: string) => void;
}

function FormulaInput({ formula, rowName, setFormula }: FormulaInputProps) {
  const { showModal } = useTableWrapperContext();

  return (
    <div
      className="custom-input formula-input"
      onClick={() => showModal(formula, rowName, setFormula)}
    >
      <p>formula</p>
    </div>
  );
}

export default FormulaInput;
