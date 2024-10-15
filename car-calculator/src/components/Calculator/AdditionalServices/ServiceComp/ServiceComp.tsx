import classNames from 'classnames';

import './ServiceComp.css';

interface ServiceCompProps {
  name: string;
  isSelected: boolean;
  changeEventFunc: (name: string) => void;
}

function ServiceComp({
  name,
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
        name={name}
        onChange={() => changeEventFunc(name)}
        checked={isSelected}
      />
      <p>{name}</p>
    </div>
  );
}

export default ServiceComp;
