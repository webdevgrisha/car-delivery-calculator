import { useEffect, useState } from 'react';
import { SVG_SelectArrow } from '../../../assets';
import './AdditionalServices.css';
import classNames from 'classnames';
import { useImmer } from 'use-immer';
import ServiceComp from './ServiceComp/ServiceComp';
import { getTableData } from '../../../services/firebase/firestoreDb';
import { Currency } from '../interfaces';

interface AdditionalServices {
  [key: string]: AdditionalService;
}

interface AdditionalService {
  rowName: string;
  isShow: boolean;
  price: string;
  currency: Currency;
  isSelected: boolean;
}

function AdditionalServices() {
  const [additionalServices, setAdditionalServices] =
    useImmer<AdditionalServices | null>(null);
  const [showServices, setShowServices] = useState<boolean>(false);

  useEffect(() => {
    getTableData('additional_services', 'rowName').then((data) => {
      console.log('additional_services data: ', data);

      setAdditionalServices(data as AdditionalServices);
    });
  }, []);

  const handleArrowClick = () => {
    setShowServices(!showServices);
  };

  const handleAddService = (id: string) => {
    setAdditionalServices((draft) => {
      if (draft === null) return;

      draft[id].isSelected = !draft[id].isSelected;
    });
  };

  const headerClass = classNames({
    underline: showServices,
  });

  const arrowClass = classNames({
    arrow: true,
    rotate: showServices,
  });

  const servicesClass = classNames({
    services: true,
    showen: showServices,
  });

  return (
    <section className="additional-services">
      <div className="container">
        <header className={headerClass}>
          <h3>Additional services</h3>
          <span className={arrowClass} onClick={handleArrowClick}>
            <SVG_SelectArrow color={'#216DD1'} />
          </span>
        </header>
        <div className={servicesClass}>
          {Object.entries(additionalServices || {}).map(([id, serviceData]) => {
            return (
              <ServiceComp
                key={id}
                {...serviceData}
                // isSelected={value}
                changeEventFunc={() => handleAddService(id)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdditionalServices;
