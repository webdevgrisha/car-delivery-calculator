import classNames from 'classnames';
import { SVG_Cancel, SVG_Show, SVG_UnShow } from '../../../../../assets';

import './RenderRow.css';
import { useState } from 'react';
import { CustomInput, CustomSelect } from '../../../..';

interface RenderRowProps {
  service_id: string;
  service_name: string;
  currency: 'USD' | 'EUR' | 'PLN';
  price: string;
  isShown: boolean;
  handleFieldChange: (
    id: string,
    name: string,
    value: string | boolean,
  ) => void;
  handleServiceDelete: (id: string) => void;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

function RenderRow({
  service_id,
  service_name,
  currency,
  price,
  isShown,
  handleFieldChange,
  handleServiceDelete,
}: RenderRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleVisability = () => {
    handleFieldChange(service_id, 'isShown', !isShown);
  };

  const rowClasses = classNames({
    hide: !isShown,
  });

  console.log('service_name: ', !service_name);

  const serviveNameClasses = classNames({
    'show-text': !isEditing && service_name.trim(),
  });

  return (
    <tr className={rowClasses}>
      <td
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        className={serviveNameClasses}
      >
        <CustomInput
          name="service_name"
          value={service_name}
          // placeholder="service name"
          changeEventFunc={(value: string) =>
            handleFieldChange(service_id, 'service_name', value)
          }
        />
        {/* <input
          name="service_name"
          value={service_name}
          onChange={(e) =>
            handleFieldChange(service_id, 'service_name', e.target.value)
          }
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className={serviveNameClasses}
        /> */}
      </td>
      <td>
        <CustomSelect
          name="currency"
          selectionOptions={selectionOptions}
          value={currency}
          changeEventFunc={(value: string) =>
            handleFieldChange(service_id, 'currency', value)
          }
        />
      </td>
      <td>
        <CustomInput
          name="price"
          value={price}
          type="number"
          placeholder="0"
          changeEventFunc={(value: string) =>
            handleFieldChange(service_id, 'price', value)
          }
        />
      </td>
      <td>
        <div className="buttons">
          <button className="btn" onClick={handleVisability}>
            {isShown ? <SVG_Show /> : <SVG_UnShow />}
          </button>
          <button
            className="btn"
            onClick={() => handleServiceDelete(service_id)}
          >
            <SVG_Cancel />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RenderRow;
