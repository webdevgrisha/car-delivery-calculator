import './RenderTableRow.css';

import { SVG_Edit, SVG_Delete, SVG_Cancel, SVG_Save } from '../../../assets';
import { FieldInfo, FieldsValidateFuncs } from '../interfaces';

import { showWarningToastMessage, showUpdateToast } from '../tableToast';
import { Id, toast } from 'react-toastify';
import { useCallback, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { RenderField } from '..';

interface CreateTableRowProps {
  id: string;
  fields: FieldInfo[];
  rowData: string[];
  isEdit: boolean;
  setEditRowId: (id: string) => void;
  fieldsValidateFuncs: FieldsValidateFuncs;
  deleteRecordFunc: Function;
  editRecordFunc: Function;
}

function RenderTableRow({
  id,
  fields,
  rowData,
  isEdit,
  setEditRowId,
  fieldsValidateFuncs,
  deleteRecordFunc,
  editRecordFunc,
}: CreateTableRowProps) {
  const [editRecordData, setEditRecordData] = useImmer<Record<string, string>>(
    {},
  );
  const [invalidFields, setInvalidFields] = useImmer<Record<string, boolean>>(
    {},
  );

  const handleCancel = () => {
    const confirmCancel = confirm('Are you sure you want to cancel ?');

    if (!confirmCancel) return;

    setEditRowId('');
  };

  const handleDelete = (id: string) => {
    const confirmCancel = confirm('Are you sure you want to delete ?');

    if (!confirmCancel) return;

    const toastId: Id = toast.loading('Please wait...');

    deleteRecordFunc({ id }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);
    });
  };

  const handleEditRecord = (id: string) => {
    const confirmCancel = confirm('Are you sure you want to change the data ?');

    if (!confirmCancel) return;

    const invalidFieldsArr: boolean[] = Object.entries(editRecordData).map(
      ([name, value]) => {
        const func = fieldsValidateFuncs[name];
        console.log('value: ', value);
        const isValid = func(value);

        if (isValid) return true;

        setInvalidFields((draft) => {
          draft[name] = true;
        });

        showWarningToastMessage(name);
        return false;
      },
    );

    console.log();
    if (invalidFieldsArr.some((valid) => valid === false)) return;

    const toastId: Id = toast.loading('Please wait...');

    console.log('editRecordData: ', editRecordData);

    if (Object.keys(editRecordData).length === 0) {
      showUpdateToast(toastId, 'there is nothing to update', 'warning');
      return;
    }

    editRecordFunc({ id, editRecordData }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);

      if (status !== 'error') {
        setEditRecordData({});
        setEditRowId('');
      }

      // setEditRecordData({});
    });
  };

  const ActionBtns = () => {
    return (
      <div className="buttons">
        {!isEdit && (
          <>
            <button className="edit-btn btn" onClick={() => setEditRowId(id)}>
              <SVG_Edit />
            </button>
            <button className="delete-btn btn" onClick={() => handleDelete(id)}>
              <SVG_Delete />
            </button>
          </>
        )}
        {isEdit && (
          <>
            <button
              className="save-btn btn"
              onClick={() => handleEditRecord(id)}
            >
              <SVG_Save />
            </button>
            <button className="cancel-btn btn" onClick={handleCancel}>
              <SVG_Cancel />
            </button>
          </>
        )}
      </div>
    );
  };

  const handleFieldChange = (name: string, value: string) => {
    setEditRecordData((draft) => {
      draft[name] = value;
    });
  };

  return (
    <tr>
      {rowData.map((initValue: string, index: number) => {
        const buttons = rowData.length - 1 === index ? <ActionBtns /> : null;
        const fieldName = fields[index].fieldConfig.name;

        const errorClass = invalidFields[fieldName] ? 'error' : '';

        return (
          <td className={errorClass} key={index}>
            <RenderField
              isEdit={isEdit}
              initValue={initValue}
              currValue={editRecordData[fieldName]}
              field={fields[index]}
              handleFieldChange={handleFieldChange}
            />
            {buttons}
          </td>
        );
      })}
    </tr>
  );
}

export default RenderTableRow;
