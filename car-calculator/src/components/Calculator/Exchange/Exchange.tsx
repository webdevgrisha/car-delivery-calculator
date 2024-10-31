import { useState, useEffect } from 'react';
import { Loader } from '../../index';

import './Exchange.css';

import { subscribeOnFirstTableRecord } from '../../../services/firebase/firestoreDb';

interface ExchangeData {
  exchangeRate: ExchangeRate;
  isShown: IsShown;
  usd_pln: string;
  usd_eur: string;
}

function Exchange() {
  const [exchangeData, setExchangeData] = useState<ExchangeData>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscibe = subscribeOnFirstTableRecord('exchange', (row) => {
      setExchangeData(row.rowData);
      setLoading(false);
    });

    return unsubscibe;
  }, []);

  if (loading) return <Loader />;

  if(exchangeData.isShown === 'No') return null;

  return (
    <div className="currency-block">
      <p>USD/EUR - {exchangeData.usd_eur}</p>
      <p>USD/PLN - {exchangeData.usd_pln}</p>
    </div>
  );
}

export default Exchange;
