import TableWrapper from './TableWrapper/TableWrapper';

function CalculationResultSettings() {
  return (
    <section className="calculation-result-settings">
      <div className="container">
        <header>
          <h5>Dodatkowe usługi</h5>
        </header>
        <TableWrapper
          tableName="Aukcja i wysyłka"
          tablePath="auction_and_shipping"
        />
      </div>
    </section>
  );
}

export default CalculationResultSettings;
