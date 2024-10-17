import { useEffect, useState } from 'react';
import { SVG_SelectArrow } from '../../../assets';
import './AdditionalServices.css';
import classNames from 'classnames';
import { useImmer } from 'use-immer';
import ServiceComp from './ServiceComp/ServiceComp';
import { getColumnData } from '../../../services/firebase/firestoreDb';

interface Services {
  [key: string]: boolean;
}

function AdditionalServices() {
  const [additionalServices, setAdditionalServices] = useImmer<Services>({});
  const [showServices, setShowServices] = useState<boolean>(false);

  useEffect(() => {
    getColumnData('additional_services', 'service_name').then((data) => {
      const serviceConfig = data.slice(1).reduce((serviceConfig, serviceName) => {
        serviceConfig[serviceName] = false;

        return serviceConfig;
      }, {} as Services);

      setAdditionalServices(() => serviceConfig);
    });
  }, []);

  const handleArrowClick = () => {
    setShowServices(!showServices);
  };

  const handleAddService = (name: string) => {
    setAdditionalServices((draft) => {
      draft[name] = !draft[name];
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
          {Object.entries(additionalServices).map(([name, value], index) => {
            return (
              <ServiceComp
                key={index}
                name={name}
                isSelected={value}
                changeEventFunc={handleAddService}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AdditionalServices;
