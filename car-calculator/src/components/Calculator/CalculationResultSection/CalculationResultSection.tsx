import classNames from 'classnames';
import { RowData, SelectedAdditionalServices } from '../interfaces';
import './CalculationResultSection.css';

interface SubSectionProps {
  title: string;
  rows: RowData[];
  sectionResult: number[] | null;
  selectedAdditionalServices?: SelectedAdditionalServices;
}

function CalculationResultSection({
  title,
  rows,
  sectionResult,
  selectedAdditionalServices = {},
}: SubSectionProps) {
  console.log('rows: ', rows);
  console.log(
    'selectedAdditionalServices: ',
    Object.values(selectedAdditionalServices),
  );
  const totalRows = [...rows];
  totalRows.splice(-1, 0,
    ...(Object.values(selectedAdditionalServices)),
  );

  console.log('totalRows: ', totalRows);

  return (
    <div className="sub-section">
      <h3>{title}</h3>

      {totalRows.map(({ rowName, currency }, index) => {
        const rowClass = classNames({
          row: true,
          last: index === totalRows.length - 1,
        });

        const price: number = sectionResult?.[index] || 0;

        return (
          <>
            <div className={rowClass} key={rowName}>
              <p className="name">{rowName}</p>
              <p className="price">
                {price} {currency}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default CalculationResultSection;
