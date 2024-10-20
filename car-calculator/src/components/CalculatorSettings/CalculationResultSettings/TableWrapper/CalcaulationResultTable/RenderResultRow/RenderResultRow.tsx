import classNames from 'classnames';
import {
  SVG_Edit,
} from '../../../../../../assets';

import './RenderResultRow.css';
import { useState } from 'react';
import { CustomInput, CustomSelect } from '../../../../..';
import { Currency } from '../../types';
import { useTableWrapperContext } from '../../tableWrapperContext';

interface RenderResultRowProps {
  rowId: string;
  rowName: string;
  currency: Currency;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

function RenderResultRow({
  rowId,
  rowName,
  currency,
}: RenderResultRowProps) {
  const { editRecordFunc } = useTableWrapperContext();

  const [isEditing, setIsEditing] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const isShowText = !isEditing && rowName.trim();

  const serviveNameClasses = classNames({
    'show-text': isShowText,
    'show-edt-btn': showEditBtn && isShowText,
  });

  return (
    <tr className='result-row'>
      <td
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onMouseEnter={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
        className={serviveNameClasses}
      >
        <CustomInput
          name="service_name"
          value={rowName}
          placeholder="service name"
          changeEventFunc={(value: string) =>
            editRecordFunc(rowId, 'service_name', value)
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
            editRecordFunc(rowId, 'currency', value as Currency)
          }
        />
      </td>
    </tr>
  );
}

export default RenderResultRow;
