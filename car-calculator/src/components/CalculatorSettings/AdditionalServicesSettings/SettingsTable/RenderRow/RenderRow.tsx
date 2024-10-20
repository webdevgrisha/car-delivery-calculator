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
import { Currency } from '../../types';
import { useAdditionaServiceTableContext } from '../../AdditionaServiceTableContext';

interface RenderRowProps {
  isError: boolean;
  serviceId: string;
  rowName: string;
  currency: Currency;
  price: string;
  isShown: boolean;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

function RenderRow({
  isError,
  serviceId,
  rowName,
  currency,
  price,
  isShown,
}: RenderRowProps) {
  const {
    deleteRecordFunc: handleServiceDelete,
    editRecordFunc: handleFieldChange,
  } = useAdditionaServiceTableContext();

  const [isEditing, setIsEditing] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const handleVisability = () => {
    handleFieldChange(serviceId, 'isShown', !isShown);
  };

  const rowClasses = classNames({
    hide: !isShown,
    error: isError,
  });

  const isShowText = !isEditing && rowName.trim();

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
          name="rowName"
          value={rowName}
          placeholder="service name"
          changeEventFunc={(value: string) =>
            handleFieldChange(serviceId, 'rowName', value)
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
            handleFieldChange(serviceId, 'currency', value as Currency)
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
            handleFieldChange(serviceId, 'price', value)
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
            onClick={() => handleServiceDelete(serviceId)}
          >
            <SVG_Cancel />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RenderRow;
