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
import { Reorder } from 'framer-motion';
import FormulaInput from '../FormulaInput/FormulaInput';

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

const variants = {
  initial: {
    opacity: 0,
    height: 0,
  },
  animate: {
    opacity: 1,
    height: 'auto',
  },
  exit: {
    opacity: 0,
    height: 0,
  },
};

function RenderInfoRow({
  rowId,
  rowName,
  currency,
  isShown,
  formula,
}: RenderRowProps) {
  const { editRecordFunc, deleteRecordFunc } = useTableWrapperContext();

  const [isEditing, setIsEditing] = useState(false);
  const [showEditBtn, setShowEditBtn] = useState(false);

  const handleVisability = () => {
    editRecordFunc(rowId, 'isShown', !isShown, 'info');
  };

  const rowClasses = classNames({
    hide: !isShown,
  });

  const isShowText = !isEditing && rowName.trim();

  const rowNameClasses = classNames({
    'show-text': isShowText,
    'show-edt-btn': showEditBtn && isShowText,
  });

  return (
    <Reorder.Item
      className={rowClasses}
      value={rowId}
      as="tr"
      whileDrag={{
        scale: 1.05,
        backgroundColor: '#f0f8ff',
      }}
      {...variants}
    >
      <td
        onFocus={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        onMouseEnter={() => setShowEditBtn(true)}
        onMouseLeave={() => setShowEditBtn(false)}
        className={rowNameClasses}
      >
        <CustomInput
          name="rowName"
          value={rowName}
          placeholder="row name"
          changeEventFunc={(value: string) =>
            editRecordFunc(rowId, 'rowName', value, 'info')
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
            editRecordFunc(rowId, 'currency', value as Currency, 'info')
          }
        />
      </td>
      <td>
        <FormulaInput formula={formula} setFormula={(value: string) =>
            editRecordFunc(rowId, 'formula', value, 'info')
          } />
      </td>
      <td>
        <div className="buttons">
          <button className="btn" onClick={handleVisability}>
            {isShown ? <SVG_Show /> : <SVG_UnShow />}
          </button>
          <button
            className="btn"
            onClick={() => {
              deleteRecordFunc(rowId);
            }}
          >
            <SVG_Cancel />
          </button>
        </div>
      </td>
    </Reorder.Item>
  );
}

export default RenderInfoRow;
