import { useState, useEffect } from 'react';
import { Loader } from '../../index';

import './Exchange.css';

import { getConversion } from '../../../services/exchnage-api';

interface CurrencyPair {
  baseCode: string;
  targetCode: string;
}

interface ExchangeProps {
  currencyPairs: CurrencyPair[];
}

function Exchange(props: ExchangeProps) {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currencyPairs } = props;

  // useEffect(() => {
  //   const fetchExchangeRate = async () => {
  //     const promiseArr = currencyPairs.map(({ baseCode, targetCode }) =>
  //       getConversion(baseCode, targetCode),
  //     );

  //     const result = await Promise.all(promiseArr);

  //     setExchangeRates(result);
  //     setLoading(false);
  //   };

  //   fetchExchangeRate();
  // }, []);

  // if (loading) return <Loader />;

  return (
    <div className="currency-block">
      {/* {currencyPairs.map(({ baseCode, targetCode }, index: number) => {
        const price = exchangeRates[index];

        return (
          <p key={`${baseCode}/${targetCode}`}>
            {baseCode}/{targetCode} - {price}
          </p>
        );
      })} */}
      <p>USD/EUR - 0.91</p>
    </div>
  );
}

export default Exchange;
