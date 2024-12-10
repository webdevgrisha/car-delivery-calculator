import { useState, useEffect } from 'react';
import { Loader } from '../../index';
import './Exchange.css';
import { subscribeOnFirstTableRecord } from '../../../services/firebase/firestoreDb';

type ExchangeRate = 'Manual' | 'Automatically';
type IsShown = 'Yes' | 'No';

interface ExchangeData {
  exchangeRate: ExchangeRate;
  isShown: IsShown;
  usd_pln: string;
  usd_eur: string;
}

function Exchange() {
  const [exchangeData, setExchangeData] = useState<ExchangeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscibe = subscribeOnFirstTableRecord(
      'exchange',
      (row: { rowData: ExchangeData }) => {
        const data = row.rowData;

        setExchangeData(data);

        setLoading(false);
      },
    );

    return unsubscibe;
  }, []);

  if (loading) return <Loader />;

  if (exchangeData === null) {
    return <p>An error occurred while receiving data</p>;
  }

  if (exchangeData.isShown === 'No') return null;

  return (
    <div className="currency-block">
      <p>USD/EUR - {exchangeData.usd_eur}</p>
      <p>USD/PLN - {exchangeData.usd_pln}</p>
    </div>
  );
}

export default Exchange;
