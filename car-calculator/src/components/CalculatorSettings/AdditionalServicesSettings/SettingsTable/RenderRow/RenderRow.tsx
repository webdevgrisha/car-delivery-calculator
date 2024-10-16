import classNames from 'classnames';
import {
  SVG_Cancel,
  SVG_Edit,
  SVG_Show,
  SVG_UnShow,
} from '../../../../../assets';

import './RenderRow.css';
import { useState } from 'react';
import { CustomInput, CustomSelect } from '../../../..';
import { ServiceData } from '../interfaces';
import { Currency } from '../types';

interface RenderRowProps {
  isError: boolean;
  service_id: string;
  service_name: string;
  currency: Currency;
  price: string;
  isShown: boolean;
  handleFieldChange: <K extends keyof ServiceData['rowData']>(
    id: string,
    name: K,
    value: ServiceData['rowData'][K],
  ) => void;
  handleServiceDelete: (id: string) => void;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

function RenderRow({
  isError,
  service_id,
  service_name,
  currency,
  price,
  isShown,
  handleFieldChange,
  handleServiceDelete,
}: RenderRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const handleVisability = () => {
    handleFieldChange(service_id, 'isShown', !isShown);
  };

  const rowClasses = classNames({
    hide: !isShown,
    error: isError,
  });

  const isShowText = !isEditing && service_name.trim();

  const serviveNameClasses = classNames({
    'show-text': isShowText,
    'show-edt-btn': showEditBtn && isShowText,
  });

  return (
    <tr className={rowClasses}>
      <td
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onMouseEnter={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
        className={serviveNameClasses}
      >
        <CustomInput
          name="service_name"
          value={service_name}
          placeholder="service name"
          changeEventFunc={(value: string) =>
            handleFieldChange(service_id, 'service_name', value)
          }
        />
        <button className="btn">
          <SVG_Edit />
        </button>
      </td>
      <td>
        <CustomSelect
          name="currency"
          selectionOptions={selectionOptions}
          value={currency}
          changeEventFunc={(value: string) =>
            handleFieldChange(service_id, 'currency', value as Currency)
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
