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
import FormulaInput from '../FormulaInput/FormulaInput';

interface RenderRowProps {
  isError: boolean;
  serviceId: string;
  rowName: string;
  currency: Currency;
  baseCurrency: Currency;
  formula: string;
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
  baseCurrency,
  formula,
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
        <CustomSelect
          name="baseCurrency"
          selectionOptions={selectionOptions}
          value={baseCurrency}
          changeEventFunc={(value: string) =>
            handleFieldChange(serviceId, 'baseCurrency', value as Currency)
          }
        />
      </td>
      <td>
        <FormulaInput
          formula={formula}
          rowName={rowName}
          setFormula={(value: string) =>
            handleFieldChange(serviceId, 'formula', value as Currency)
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
