import './CreateTableRow.css';

import { SVG_Edit, SVG_Delete, SVG_Cancel, SVG_Save } from '../../../assets';
import { FieldInfo } from '../interfaces';
import CustomInput from '../ CustomInput/CustomInput';
import CustomSelect from '../CustomSelect/CustomSelect';

interface CreateTableRowProps {
  id: string;
  fields: FieldInfo[];
  rowData: string[];
  isEdit: boolean;
  setEditRowId: (id: string) => void;
}

function CreateTableRow({
  id,
  fields,
  rowData,
  isEdit,
  setEditRowId,
}: CreateTableRowProps) {
  const ActionBtn = () => {
    return (
      <div className="buttons">
        {!isEdit && (
          <>
            <button className="edit-btn btn" onClick={() => setEditRowId(id)}>
              <SVG_Edit />
            </button>
            <button className="delete-btn btn">
              <SVG_Delete />
            </button>
          </>
        )}
        {isEdit && (
          <>
            <button className="save-btn btn">
              <SVG_Save />
            </button>
            <button className="cancel-btn btn" onClick={() => true}>
              <SVG_Cancel />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <tr key={id}>
      {rowData.map((value: string, index: number) => {
        const buttons = rowData.length - 1 === index ? <ActionBtn /> : null;
        return (
          <td>
            <RenderField isEdit={isEdit} value={value} field={fields[index]} />
            {buttons}
          </td>
        );
      })}
    </tr>
  );
}

interface RenderFieldProps {
  isEdit: boolean;
  value: string;
  field: FieldInfo;
}

function RenderField({ isEdit, value, field }: RenderFieldProps) {
  console.log('field: ', field);
  if (!isEdit) {
    return <p>{value}</p>;
  }

  const { tagName, fieldConfig } = field;
  const configCopy = Object.assign({}, fieldConfig);
  configCopy.defaultValue = value;

  if (tagName === 'input') {
    return <CustomInput {...configCopy} />;
  }

  return <CustomSelect {...configCopy} />;
}

export default CreateTableRow;
