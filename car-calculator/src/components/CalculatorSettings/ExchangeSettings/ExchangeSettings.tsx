import { useImmer } from 'use-immer';
import CustomInput from '../../ CustomInput/CustomInput';
import CustomSelect from '../../CustomSelect/CustomSelect';
import './ExchangeSettings.css';
import { useEffect } from 'react';
import { subscribeOnFirstTableRecord } from '../../../services/firebase/firestoreDb';
import { updateCalculatorSettingsData } from '../../../services/firebase/functions';
import { Id, toast } from 'react-toastify';
import { showUpdateToast } from '../../CustomTable/tableToast';
import classNames from 'classnames';

type ExchangeRate = 'Manual' | 'Automatically';
type IsShown = 'Yes' | 'No';

interface ExchangeData {
  id: string;
  rowData: {
    exchangeRate: ExchangeRate;
    isShown: IsShown;
    usd_pln: string;
    usd_eur: string;
  };
}

function ExchangeSettings() {
  const [exchangeData, setExchangeData] = useImmer<ExchangeData>({
    id: '',
    rowData: {
      exchangeRate: 'Automatically',
      isShown: 'Yes',
      usd_pln: '',
      usd_eur: '',
    },
  });

  const [errorRate, setErrorRate] = useImmer({
    usd_pln: false,
    usd_eur: false,
  });

  useEffect(() => {
    const unsubscrive = subscribeOnFirstTableRecord(
      'exchange',
      (updateData: ExchangeData) =>
        setExchangeData(() => {
          return updateData;
        }),
    );

    return unsubscrive;
  }, []);

  const handleSubmit = () => {
    const toastId: Id = toast.loading('Please wait...');

    const usd_eurValid = +exchangeData.rowData.usd_eur < 0;
    const eur_plnValid = +exchangeData.rowData.usd_pln < 0;

    if (usd_eurValid || eur_plnValid) {
      showUpdateToast(toastId, 'Price cannot be less than zero', 'warning');
      setErrorRate((draft) => {
        draft.usd_eur = usd_eurValid;
        draft.usd_pln = eur_plnValid;
      });
      return;
    }

    console.log('exchangeData.rowData:', exchangeData.rowData);
    updateCalculatorSettingsData({
      tableName: 'exchange',
      tableAction: [{ id: exchangeData.id, config: exchangeData.rowData }],
    }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);
    });
  };

  const usd_plnClass = classNames({ row: true, error: errorRate.usd_pln });
  const usd_eurClass = classNames({ row: true, error: errorRate.usd_eur });

  return (
    <section className="exchange-settings">
      <div className="container">
        <header>
          <h5>Exchange Settings</h5>
        </header>
        <div className="row-wrapper">
          <div className="row">
            <p>Exchange Rates</p>
            <CustomSelect
              name="exchangeRate"
              selectionOptions={['select rate', 'Manual', 'Automatically']}
              value={exchangeData.rowData.exchangeRate}
              changeEventFunc={(value) =>
                setExchangeData((draft) => {
                  console.log('value: ', value);
                  draft.rowData.exchangeRate = value as ExchangeRate;
                })
              }
            />
          </div>
          <div className={usd_plnClass}>
            <p>USD / PLN</p>
            <CustomInput
              name="usd_pln"
              value={exchangeData.rowData.usd_pln}
              type="number"
              placeholder="0 / 0"
              changeEventFunc={(value) => {
                setErrorRate((draft) => {
                  draft.usd_pln = false;
                });
                setExchangeData((draft) => {
                  draft.rowData.usd_pln = value;
                });
              }}
            />
          </div>
          <div className={usd_eurClass}>
            <p>USD / EUR</p>
            <CustomInput
              name="usd_eur"
              value={exchangeData.rowData.usd_eur}
              type="number"
              placeholder="0 / 0"
              changeEventFunc={(value) => {
                setErrorRate((draft) => {
                  draft.usd_eur = false;
                });
                setExchangeData((draft) => {
                  draft.rowData.usd_eur = value;
                });
              }}
            />
          </div>
          <div className="row">
            <p>Show exchange rate under the calculator</p>
            <CustomSelect
              name="isShown"
              selectionOptions={['select display mode','Yes', 'No']}
              value={exchangeData.rowData.isShown}
              changeEventFunc={(value) =>
                setExchangeData((draft) => {
                  draft.rowData.isShown = value as IsShown;
                })
              }
            />
          </div>
        </div>
        <footer>
          <button className="btn save" onClick={handleSubmit}>
            Save
          </button>
        </footer>
      </div>
    </section>
  );
}

export default ExchangeSettings;
