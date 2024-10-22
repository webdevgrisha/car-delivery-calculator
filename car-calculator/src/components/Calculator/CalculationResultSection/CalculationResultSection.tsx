import classNames from 'classnames';
import { RowData } from '../interfaces';
import './CalculationResultSection.css';

interface SubSectionProps {
  title: string;
  rows: RowData[];
}

function CalculationResultSection({ title, rows }: SubSectionProps) {
  return (
    <div className="sub-section">
      <h3>{title}</h3>

      {rows.map(({ rowName, currency }, index) => {
        const rowClass = classNames({
          row: true,
          last: index === rows.length - 1,
        });

        return (
          <div className={rowClass} key={index}>
            <p className="name">{rowName}</p>
            <p className="price">0 {currency}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CalculationResultSection;
