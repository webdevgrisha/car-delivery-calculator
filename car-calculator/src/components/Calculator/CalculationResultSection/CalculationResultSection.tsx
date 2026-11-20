import classNames from 'classnames';
import {
  RowData,
  SelectedAdditionalServices,
} from '../interfaces';
import './CalculationResultSection.css';

interface SubSectionProps {
  title: string;
  rows: RowData[];
  sectionResult: number[] | null;
  selectedOptionalRowIds: string[];
  selectedAdditionalServices?: SelectedAdditionalServices;
}

function CalculationResultSection({
  title,
  rows,
  sectionResult,
  selectedOptionalRowIds,
  selectedAdditionalServices = {},
}: SubSectionProps) {
  console.log('rows: ', rows);
  console.log(
    'selectedAdditionalServices: ',
    Object.values(selectedAdditionalServices),
  );
  const infoRows = rows.slice(0, -1);
  const resultRow = rows.at(-1);
  const additionalServices = Object.values(selectedAdditionalServices);
  const totalRows = [
    ...infoRows.map((row, resultIndex) => ({ row, resultIndex })),
    ...additionalServices.map((row, index) => ({
      row: {
        rowName: row.rowName,
        currency: row.currency,
      } as RowData,
      resultIndex: infoRows.length + index,
    })),
    ...(resultRow
      ? [
          {
            row: resultRow,
            resultIndex: infoRows.length + additionalServices.length,
          },
        ]
      : []),
  ].filter(
    ({ row }) =>
      !row.isOptional ||
      Boolean(row.id && selectedOptionalRowIds.includes(row.id)),
  );

  console.log('totalRows: ', totalRows);

  return (
    <div className="sub-section">
      <h3>{title}</h3>

      {totalRows.map(({ row: { id, rowName, currency }, resultIndex }, index) => {
        const rowClass = classNames({
          row: true,
          last: index === totalRows.length - 1,
        });

        const price: number = sectionResult?.[resultIndex] || 0;
        return (
          <div className={rowClass} key={id || rowName}>
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
