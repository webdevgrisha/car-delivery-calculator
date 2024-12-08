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
  selectedAdditionalServices,
}: SubSectionProps) {
  const additonalRows = (
    <RenderAdditionalServices
      selectedAdditionalServices={selectedAdditionalServices}
    />
  );

  // const updatSectionResult = sectionResult?.splice(
  //   rows.length - 2,
  //   Object.keys(selectedAdditionalServices)?.length || 0,
  //   -1,
  // );

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
          <>
            {index === rows.length - 1 ? additonalRows : null}
            <div className={rowClass} key={index}>
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

interface RenderAdditionalServicesProps {
  selectedAdditionalServices: SelectedAdditionalServices | undefined;
}

function RenderAdditionalServices({
  selectedAdditionalServices,
}: RenderAdditionalServicesProps) {
  if (selectedAdditionalServices === undefined) return null;

  const rows = Object.entries(selectedAdditionalServices);

  return (
    <>
      {rows.map(([id, { rowName, price, currency }]) => {
        return (
          <div className="row" key={id}>
            <p className="name">{rowName}</p>
            <p className="price">
              {price} {currency}
            </p>
          </div>
        );
      })}
    </>
  );
}

export default CalculationResultSection;
