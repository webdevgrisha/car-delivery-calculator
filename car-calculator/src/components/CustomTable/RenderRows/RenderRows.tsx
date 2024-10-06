import { useState } from 'react';
import CreateTableRow from '../RenderTableRow/RenderTableRow';
import { FieldsValidateFuncs, TableRecord } from '../interfaces';
import { FieldInfo } from '../types';

interface RenderRowsProps {
  columnNames: string[];
  records: TableRecord[];
  fields: FieldInfo[];
  deleteRecordFunc: Function;
  editRecordFunc: Function;
}

function RenderRows({
  columnNames,
  fields,
  records,
  deleteRecordFunc,
  editRecordFunc,
}: RenderRowsProps) {
  const [editRowId, setEditRowId] = useState<string>('');

  const rows = records.map((record: TableRecord) => {
    const isEdit = record.id === editRowId;

    return (
      <CreateTableRow
        key={record.id}
        columnNames={columnNames}
        id={record.id}
        rowData={record.rowData}
        fields={fields}
        isEdit={isEdit}
        setEditRowId={(id: string) => setEditRowId(id)}
        deleteRecordFunc={deleteRecordFunc}
        editRecordFunc={editRecordFunc}
      />
    );
  });

  return rows;
}

export default RenderRows;
