import './CalculationResultSettings.css';
import TableWrapper from './TableWrapper/TableWrapper';

function CalculationResultSettings() {
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
        />

        <hr className="table-delimiter" />

        <TableWrapper tableName="Odprawa celna" tablePath="customs_clearance" />

        <hr className="table-delimiter" />

        <TableWrapper tableName="Inne płatności" tablePath="other_payments" />
      </div>
      </div>
    </section>
  );
}

export default CalculationResultSettings;
