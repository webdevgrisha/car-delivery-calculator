import classNames from 'classnames';

import './ServiceComp.css';
import { Currency } from '../../interfaces';

interface ServiceCompProps {
  rowName: string;
  currency: Currency;
  isSelected: boolean;
  changeEventFunc: () => void;
}

function ServiceComp({
  rowName,
  currency,
  isSelected = false,
  changeEventFunc,
}: ServiceCompProps) {
  const serviceClass = classNames({
    service: true,
    selected: isSelected,
  });

  return (
    <div className={serviceClass}>
      <input
        type="checkbox"
        name={rowName}
        onChange={changeEventFunc}
        checked={isSelected}
      />
      <p>{rowName}</p>
      <p className="price">
        {currency}
      </p>
    </div>
  );
}

export default ServiceComp;
