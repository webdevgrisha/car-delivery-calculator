import { Currency } from '../interfaces';
import './TotalSum.css';

interface TotalSumProps {
  title: string;
  currency: Currency;
}

function TotalSum(props: TotalSumProps) {
  const { title, currency } = props;
  return (
    <div className="total-sum">
      <p className="title">{title}</p>
      <p className="price">0 {currency}</p>
    </div>
  );
}

export default TotalSum;
