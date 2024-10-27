import { useTableWrapperContext } from '../../tableWrapperContext';
import './FormulaInput.css';

interface FormulaInputProps {
  formula: string;
  setFormula: (value: string) => void;
}

function FormulaInput({ formula, setFormula }: FormulaInputProps) {
  const { showModal } = useTableWrapperContext();

  return (
    <div
      className="custom-input formula-input"
      onClick={() => showModal(formula, setFormula)}
    >
      <p>formula</p>
    </div>
  );
}

export default FormulaInput;
