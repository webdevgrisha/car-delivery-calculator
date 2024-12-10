import { useState } from 'react';
import RenderTableRow from '../RenderTableRow/RenderTableRow';
import { TableRecord } from '../interfaces';
import { useCustomTableContext } from '../tableContext';

// interface RenderRowsProps {
//   columnNames: string[];
//   records: TableRecord[];
//   fields: FieldInfo[];
//   deleteRecordFunc: Function;
//   editRecordFunc: Function;
// }

function RenderRows() {
  const { records } = useCustomTableContext();

  const [editRowId, setEditRowId] = useState<string>('');

  const rows = records.map((record: TableRecord) => {
    const isEdit = record.id === editRowId;

    return (
      <RenderTableRow
        key={record.id}
        id={record.id}
        rowData={record.rowData}
        isEdit={isEdit}
        setEditRowId={(id: string) => setEditRowId(id)}
      />
    );
  });

  return rows;
}

export default RenderRows;
