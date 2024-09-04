import './TotalSum.css';

interface SubSectionProps {
  title: string;
  currency: 'USD' | 'EUR' | 'PLN';
}

function TotalSum(props: SubSectionProps) {
  const { title, currency } = props;
  return (
    <div className="total-sum">
      <p className="title">{title}</p>
      <p className="price">0 {currency}</p>
    </div>
  );
}

export default TotalSum;
