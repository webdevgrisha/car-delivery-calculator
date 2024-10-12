import './ManualInput.css';

interface ManaulInputProps {
  value: string;
  currency: 'USD' | 'PLN' | 'EUR';
  changeEventFunc: (value: string) => void;
}

function ManualInput({
  value = '',
  currency,
  changeEventFunc,
}: ManaulInputProps) {
  return (
    <>
      <input
        type="number"
        placeholder="0"
        min="0"
        value={value}
        onChange={(e) => changeEventFunc(e.target.value)}
      />
      <span className="currency">{currency}</span>
    </>
  );
}

export default ManualInput;
