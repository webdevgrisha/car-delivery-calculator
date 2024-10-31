import { useEffect } from 'react';
import CustomSelect from '../../../CustomSelect/CustomSelect';
import './TotalCost.css';
import { subscribeOnFirstTableRecord } from '../../../../services/firebase/firestoreDb';
import { useImmer } from 'use-immer';
import { Id, toast } from 'react-toastify';
import { updateCalculatorSettingsData } from '../../../../services/firebase/functions';
import Loader from '../../../Loader/Loader';
import { showUpdateToast } from '../../../CustomTable/tableToast';

interface TotalCostProps {
  tablePath: string;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

type Currency = 'PLN' | 'USD' | 'EUR';

interface TotalCostData {
  id: string;
  rowData: {
    currency: Currency;
  };
}

function TotalCost({ tablePath }: TotalCostProps) {
  const [totalCostData, setTotalCostData] = useImmer<TotalCostData | null>(
    null,
  );

  useEffect(() => {
    const unsubscrive = subscribeOnFirstTableRecord(
      tablePath,
      (updateData: TotalCostData) =>
        setTotalCostData(() => {
          return updateData;
        }),
    );

    return unsubscrive;
  }, []);

  const handleCurrencyChange = (currency: Currency) => {
    setTotalCostData((draft) => {
      draft!.rowData.currency = currency;
    });
  };

  const handleSubmit = () => {
    const toastId: Id = toast.loading('Please wait...');

    updateCalculatorSettingsData({
      tableName: tablePath,
      tableAction: [{ id: totalCostData!.id, config: totalCostData!.rowData }],
    }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);
    });
  };

  if (totalCostData === null) {
    return <Loader />;
  }

  console.log('totalCostData: ', totalCostData);

  return (
    <div className="setting-tables-container total-cost-settings">
      <div className="content">
        <p>Całkowity koszt samochodu</p>
        <CustomSelect
          name={'currency'}
          selectionOptions={selectionOptions}
          value={totalCostData.rowData.currency}
          changeEventFunc={(value) => handleCurrencyChange(value as Currency)}
        />
      </div>
      <footer>
        <button className="btn save" onClick={handleSubmit}>
          Save
        </button>
      </footer>
    </div>
  );
}

export default TotalCost;
