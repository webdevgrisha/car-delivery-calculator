import classNames from 'classnames';
import {
  SVG_Cancel,
  SVG_Edit,
  SVG_Show,
  SVG_UnShow,
} from '../../../../../../assets';

import './RenderInfoRow.css';
import { useState } from 'react';
import { CustomInput, CustomSelect } from '../../../../..';
import { Currency } from '../../types';
import { useTableWrapperContext } from '../../tableWrapperContext';

interface RenderRowProps {
  rowId: string;
  rowName: string;
  currency: Currency;
  formula: string;
  isShown: boolean;
}

const selectionOptions = {
  PLN: 'zł',
  USD: '$',
  EUR: '€',
};

function RenderInfoRow({
  rowId,
  rowName,
  currency,
  formula,
  isShown,
}: RenderRowProps) {
  const { editRecordFunc, deleteRecordFunc } = useTableWrapperContext();

  const [isEditing, setIsEditing] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const handleVisability = () => {
    editRecordFunc(rowId, 'isShown', !isShown);
  };

  const rowClasses = classNames({
    hide: !isShown,
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
          placeholder="row name"
          changeEventFunc={(value: string) =>
            editRecordFunc(rowId, 'rowName', value)
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
      {/* <td>
        <CustomInput
          name="price"
          value={price}
          type="number"
          placeholder="0"
          changeEventFunc={(value: string) =>
            editRecordFunc(rowId, 'price', value)
          }
        />
      </td> */}
      <td>
        <div className="buttons">
          <button className="btn" onClick={handleVisability}>
            {isShown ? <SVG_Show /> : <SVG_UnShow />}
          </button>
          <button
            className="btn"
            onClick={() => deleteRecordFunc(rowId)}
          >
            <SVG_Cancel />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RenderInfoRow;
