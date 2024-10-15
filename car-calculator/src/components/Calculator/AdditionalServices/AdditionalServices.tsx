import { useState } from 'react';
import { SVG_SelectArrow } from '../../../assets';
import './AdditionalServices.css';
import classNames from 'classnames';
import { useImmer } from 'use-immer';
import ServiceComp from './ServiceComp/ServiceComp';

function AdditionalServices() {
  const [selectedServices, setSelectedServices] = useImmer({ bike: false });
  const [showServices, setShowServices] = useState<boolean>(false);

  const handleArrowClick = () => {
    setShowServices(!showServices);
  };

  const handleAddService = (name: string) => {
    setSelectedServices((draft) => {
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
          <ServiceComp
            name={'bike'}
            isSelected={selectedServices['bike']}
            changeEventFunc={handleAddService}
          />
        </div>
      </div>
    </section>
  );
}

export default AdditionalServices;
