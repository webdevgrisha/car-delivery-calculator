import { useState } from 'react';
import './App.css';

import { Currency, Section, SubSection, TotalSum } from './components/index';

const firstSubSection = [
  'Cena samochodu na aukcji',
  'Prowizja aukcyjna',
  'Koszt wysyłki do portu w USA',
  'Koszt transportu morskiego do portu w Bremerhaven',
  'Prowizja naszej firmy',
  'Suma aukcyjna i wysyłka:',
];

const secondSubSection = [
  'Cło',
  'VAT',
  'Akcyza',
  'Agencja celna i rozładunek',
  'Suma opłat celnych:',
];

const thirdSubSection = ['Transport do domu', 'Inne płatności:'];

const currencyPairs = [
  { baseCode: 'USD', targetCode: 'PLN' },
  { baseCode: 'USD', targetCode: 'EUR' },
];

function App() {
  return (
    <>
      <main className="calculator">
        <div className="colum-wrapper">
          <Section>
            <div className="container">
              <header>
                <img src="./logo-black.png" alt="logo" />
              </header>
              <SubSection
                title="Aukcja i wysyłka"
                rows={firstSubSection}
                currency="USD"
              />
              <SubSection
                title="Odprawa celna"
                rows={secondSubSection}
                currency="EUR"
              />
              <SubSection
                title="Inne płatności"
                rows={thirdSubSection}
                currency="PLN"
              />
            </div>
            <TotalSum title="Całkowity koszt samochodu:" currency="PLN" />
          </Section>
          <Currency currencyPairs={currencyPairs} />
        </div>
      </main>
    </>
  );
}

export default App;
