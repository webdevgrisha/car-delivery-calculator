import { useState } from 'react';
import CreateTableRow from '../RenderTableRow/RenderTableRow';
import { FieldInfo, FieldsValidateFuncs, TableRecord } from '../interfaces';

interface RenderRowsProps {
  records: TableRecord[];
  fields: FieldInfo[];
  fieldsValidateFuncs: FieldsValidateFuncs;
  deleteRecordFunc: Function;
  editRecordFunc: Function;
}

function RenderRows({
  fields,
  records,
  fieldsValidateFuncs,
  deleteRecordFunc,
  editRecordFunc,
}: RenderRowsProps) {
  const [editRowId, setEditRowId] = useState<string>('');

  const rows = records.map((record: TableRecord) => {
    const isEdit = record.id === editRowId;

    return (
      <CreateTableRow
        key={record.id}
        {...record}
        fields={fields}
        isEdit={isEdit}
        setEditRowId={(id: string) => setEditRowId(id)}
        fieldsValidateFuncs={fieldsValidateFuncs}
        deleteRecordFunc={deleteRecordFunc}
        editRecordFunc={editRecordFunc}
      />
    );
  });

  return rows;
}

export default RenderRows;
