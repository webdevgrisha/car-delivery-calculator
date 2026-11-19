import { Id, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { SVG_Reload, SVG_Search, SVG_Settings } from '../../../assets';
import './AutoCalculation.css';
import { FormEvent, useState } from 'react';
import CustomInput from '../../ CustomInput/CustomInput';
import { getAuctionData } from '../../../services/firebase/functions';
import checkUrl from './validateUrl';
import { showUpdateToast } from '../../CustomTable/tableToast';
import { CarData } from '../interfaces';

interface AutoCalculationProps {
  setCarData: (carData: CarData) => void;
}

interface AuctionDataResponse {
  carInfo: CarData;
  error?: string;
}

function AutoCalculation({ setCarData }: AutoCalculationProps) {
  const [url, setUrl] = useState<string>('');
  const [isRequestInProgress, setIsRequestInProgress] =
    useState<boolean>(false);

  const submitUrl = async (e: FormEvent) => {
    e.preventDefault();

    if (isRequestInProgress) {
      toast.warning('Request already in progress. Please wait...');
      return;
    }

    const toastId: Id = toast.loading('Please wait...');

    const isValid = checkUrl(url);

    if (!isValid) {
      showUpdateToast(toastId, 'Invalid url', 'error');
      
      return;
    }

    setIsRequestInProgress(true);

    try {
      const response = await getAuctionData({ url });

      const data = response.data as AuctionDataResponse;

      if (data.error) {
        showUpdateToast(toastId, data.error, 'error');
        return;
      }
      console.log('AutoCalculation: ', data);

      setCarData(data.carInfo as CarData);

      showUpdateToast(toastId, 'Data received successfully', 'success');
    } catch (err) {
      const error = err as Error;
      showUpdateToast(toastId, error.message, 'error');
    } finally {
      setIsRequestInProgress(false);
    }
  };

  return (
    <section className="auto-calculation">
      <div className="container">
        <header>
          <h5>Automatic calculation</h5>
          <span onClick={() => setUrl('')}>
            <SVG_Reload />
          </span>
          <NavLink to="/settings/calculator">
            <SVG_Settings />
          </NavLink>
        </header>
        <form onSubmit={submitUrl}>
          <CustomInput
            name={'url'}
            value={url}
            changeEventFunc={(value: string) => setUrl(value)}
            placeholder="http://www.copart.com/lot/3278..."
          />
          <button>
            <span>
              <SVG_Search />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default AutoCalculation;
