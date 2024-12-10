import { Currency } from '../interfaces';
import './TotalSum.css';

interface TotalSumProps {
  title: string;
  currency: Currency;
  totalResult: number[] | null;
}

function TotalSum({ title, currency, totalResult }: TotalSumProps) {
  const price: number = totalResult?.[0] || 0;

  return (
    <div className="total-sum">
      <p className="title">{title}</p>
      <p className="price">
        {price} {currency}
      </p>
    </div>
  );
}

export default TotalSum;
