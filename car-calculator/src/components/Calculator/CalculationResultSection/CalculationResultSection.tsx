import classNames from 'classnames';
import { RowData } from '../interfaces';
import './CalculationResultSection.css';

interface SubSectionProps {
  title: string;
  rows: RowData[];
  sectionResult: number[] | null;
}

function CalculationResultSection({
  title,
  rows,
  sectionResult,
}: SubSectionProps) {
  return (
    <div className="sub-section">
      <h3>{title}</h3>

      {rows.map(({ rowName, currency }, index) => {
        const rowClass = classNames({
          row: true,
          last: index === rows.length - 1,
        });

        const price: number = sectionResult?.[index] || 0;

        return (
          <div className={rowClass} key={index}>
            <p className="name">{rowName}</p>
            <p className="price">
              {price} {currency}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default CalculationResultSection;
