import { useState } from 'react';
import CreateTableRow from '../RenderTableRow/RenderTableRow';
import { DeleteFunc, EditFunc, UserRecord } from '../interfaces';
import { FieldInfo } from '../types';

interface RenderRowsProps {
  records: UserRecord[];
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

  const rows = records.map((record: UserRecord) => {
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
