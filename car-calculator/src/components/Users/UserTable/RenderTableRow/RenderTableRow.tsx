import { SVG_Edit, SVG_Delete, SVG_Cancel, SVG_Save } from '../../../../assets';
import { DeleteFunc, EditFunc } from '../interfaces';

import { showWarningToastMessage, showUpdateToast } from '../tableToast';
import { Id, toast } from 'react-toastify';
import { useImmer } from 'use-immer';
import { RenderField } from '..';
import { FieldInfo } from '../types';
import classNames from 'classnames';

interface CreateTableRowProps {
  uid: string;
  fields: FieldInfo[];
  userData: string[];
  isEdit: boolean;
  setEditRowId: (id: string) => void;
  deleteUserFunc: DeleteFunc;
  editUserFunc: EditFunc;
}

function RenderTableRow({
  uid,
  fields,
  userData,
  isEdit,
  setEditRowId,
  deleteUserFunc,
  editUserFunc,
}: CreateTableRowProps) {
  const [editUserData, setEditUserData] = useImmer<Record<string, string>>({});
  const [invalidFields, setInvalidFields] = useImmer<Record<string, boolean>>(
    {},
  );

  const handleCancel = () => {
    const confirmCancel = confirm('Are you sure you want to cancel ?');

    if (!confirmCancel) return;

    setEditRowId('');
  };

  const handleDelete = (uid: string) => {
    const confirmCancel = confirm('Are you sure you want to delete ?');

    if (!confirmCancel) return;

    const toastId: Id = toast.loading('Please wait...');

    deleteUserFunc({ uid }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';
      const message: string = 'message' in data ? data.message : data.error;

      showUpdateToast(toastId, message, status);
    });
  };

  // если убрать объект с валидирующими функциями, то придеться делать доп поиск по массиву полей.
  // или как вариант при вызове редоктирования, в обект сохранять все свойства и потом искать по индексу.
  const handleEditUser = (uid: string) => {
    const confirmCancel = confirm('Are you sure you want to change the data ?');

    if (!confirmCancel) return;

    const invalidFieldsArr: boolean[] = Object.entries(editUserData).map(
      ([name, value]) => {
        const field = fields.find(
          ({ fieldConfig }) => fieldConfig.name === name,
        );

        const func = field!.fieldConfig.validate;

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

    if (invalidFieldsArr.some((valid) => valid === false)) return;

    const toastId: Id = toast.loading('Please wait...');

    console.log('editRecordData: ', editUserData);

    if (Object.keys(editUserData).length === 0) {
      showUpdateToast(toastId, 'there is nothing to update', 'warning');
      return;
    }
    
    editUserFunc({ uid, editUserData }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';
      const message: string = 'message' in data ? data.message : data.error;

      showUpdateToast(toastId, message, status);

      if (status !== 'error') {
        setEditUserData({});
      }

      setEditRowId('');
    });
  };

  const ActionBtns = () => {
    return (
      <div className="buttons">
        {!isEdit && (
          <>
            <button className="edit-btn btn" onClick={() => setEditRowId(uid)}>
              <SVG_Edit />
            </button>
            <button
              className="delete-btn btn"
              onClick={() => handleDelete(uid)}
            >
              <SVG_Delete />
            </button>
          </>
        )}
        {isEdit && (
          <>
            <button
              className="save-btn btn"
              onClick={() => handleEditUser(uid)}
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
    setEditUserData((draft) => {
      draft[name] = value;
    });
  };

  return (
    <tr>
      {userData.map((initValue: string, index: number) => {
        const buttons = userData.length - 1 === index ? <ActionBtns /> : null;
        const fieldName = fields[index].fieldConfig.name;

        const tdClass = classNames({
          admin: initValue === 'admin',
          user: initValue === 'user',
          error: invalidFields[fieldName],
        });

        return (
          <td className={tdClass} key={index}>
            <RenderField
              isEdit={isEdit}
              initValue={initValue}
              value={editUserData[fieldName]}
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
