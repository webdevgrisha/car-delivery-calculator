import { useState } from 'react';
import CreateTableRow from '../RenderTableRow/RenderTableRow';
import { DeleteFunc, EditFunc, TableRecord } from '../interfaces';
import { FieldInfo } from '../types';

interface RenderRowsProps {
  records: TableRecord[];
  fields: FieldInfo[];
  deleteUserFunc: DeleteFunc;
  editUserFunc: EditFunc;
}

function RenderRows({
  fields,
  records,
  deleteUserFunc,
  editUserFunc,
}: RenderRowsProps) {
  const [editRowId, setEditRowId] = useState<string>('');

  const rows = records.map((record: TableRecord) => {
    const isEdit = record.uid === editRowId;

    return (
      <CreateTableRow
        key={record.uid}
        {...record}
        fields={fields}
        isEdit={isEdit}
        setEditRowId={(id: string) => setEditRowId(id)}
        deleteUserFunc={deleteUserFunc}
        editUserFunc={editUserFunc}
      />
    );
  });

  return rows;
}

export default RenderRows;
