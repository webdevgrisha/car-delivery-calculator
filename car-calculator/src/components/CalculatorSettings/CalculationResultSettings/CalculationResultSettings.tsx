import './CalculationResultSettings.css';
import FormulaModalWindow from './FormulaModalWindow/FormulaModalWindow';
import TableWrapper from './TableWrapper/TableWrapper';
import { useImmer } from 'use-immer';
import { FormulaModalWindowData, ShowModalFunc } from './interfaces';

function CalculationResultSettings() {
  const [modalWindowData, setModalWindowData] =
    useImmer<FormulaModalWindowData>({
      isShown: false,
      rowFormula: '',
      setRowFormula: (formula) => formula,
    });

  const showModal: ShowModalFunc = (formula, setFormula) => {
    setModalWindowData((draft) => {
      draft.isShown = true;
      draft.rowFormula = formula;
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
