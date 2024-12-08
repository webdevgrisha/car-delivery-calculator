import './CalculationResultSettings.css';
import { useImmer } from 'use-immer';
import { FormulaModalWindowData, ShowModalFunc } from './interfaces';
import TableWrapper from './TableWrapper/TableWrapper';
import FormulaModalWindow from './FormulaModalWindow/FormulaModalWindow';
import TotalCost from './TotalCost/TotalCost';

function CalculationResultSettings() {
  const [modalWindowData, setModalWindowData] =
    useImmer<FormulaModalWindowData>({
      isShown: false,
      rowFormula: '',
      rowName: '',
      setRowFormula: (formula) => formula,
    });

  const showModal: ShowModalFunc = (formula, rowName, setFormula) => {
    setModalWindowData((draft) => {
      draft.isShown = true;
      draft.rowFormula = formula;
      draft.rowName = rowName;
      draft.setRowFormula = setFormula;
    });
  };

  return (
    <section className="calculation-result-settings">
      <div className="container">
        <header>
          <img src="../logo-black.png" alt="logo" />
        </header>
        <div className="setting-tables-container">
          <TableWrapper
            tableName="Aukcja i wysyłka"
            tablePath="auction_and_shipping"
            showModal={showModal}
          />

          <hr className="table-delimiter" />

          <TableWrapper
            tableName="Odprawa celna"
            tablePath="customs_clearance"
            showModal={showModal}
          />

          <hr className="table-delimiter" />

          <TableWrapper
            tableName="Inne płatności"
            tablePath="other_payments"
            showModal={showModal}
          />

          <hr className="table-delimiter" />

          <TotalCost tablePath='total_car_cost'/>
        </div>
      </div>

      <FormulaModalWindow
        {...modalWindowData}
        closeFunc={() =>
          setModalWindowData((draft) => {
            draft.isShown = false;
          })
        }
      />
    </section>
  );
}

export default CalculationResultSettings;
