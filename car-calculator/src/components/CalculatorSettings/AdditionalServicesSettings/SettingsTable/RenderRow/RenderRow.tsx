import classNames from 'classnames';
import { SVG_Cancel, SVG_Show, SVG_UnShow } from '../../../../../assets';

import './RenderRow.css';
import { useState } from 'react';

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

  const serviveNameClasses = classNames({
    'show-text': !isEditing,
  });

  return (
    <tr className={rowClasses}>
      <td>
        <input
          name="service_name"
          value={service_name}
          onChange={(e) =>
            handleFieldChange(service_id, 'service_name', e.target.value)
          }
          onFocus={() => setIsEditing(true)}
          onBlur={() => setIsEditing(false)}
          className={serviveNameClasses}
        />
      </td>
      <td>
        <select
          name="currency"
          value={currency}
          onChange={(e) =>
            handleFieldChange(service_id, 'currency', e.target.value)
          }
        >
          <option value="USD">$</option>
          <option value="EUR">€</option>
          <option value="PLN">zł</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          name="price"
          placeholder="0"
          min="0"
          value={price}
          onChange={(e) =>
            handleFieldChange(service_id, 'price', e.target.value)
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
