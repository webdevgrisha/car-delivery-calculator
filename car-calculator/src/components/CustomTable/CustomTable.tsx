import { useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord, CreateTableRow } from '.';
import { FieldInfo, Record } from './interfaces';

interface CustomTableProps {
  tableIconPath: string;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
  records: Record[];
  addNewRecordFunc: Function;
  deleteRecordFunc: Function;
}

function CustomTable({
  tableIconPath,
  tableName = '',
  tableColumnNames,
  tableFields,
  records,
  addNewRecordFunc,
  deleteRecordFunc,
}: CustomTableProps) {
  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);

  console.log('records:', records);
  const handleAddNewRecord = () => setShowAddNewRecordFields(true);

  return (
    <section className="table-section">
      <header>
        <div className="icon">
          <img src={`/${tableIconPath}`} alt="table-icon" />
        </div>
        <h2>{tableName}</h2>
        <input type="search" placeholder="Search" />
        <button onClick={handleAddNewRecord}>Add New</button>
      </header>
      <table className="custom-table">
        <thead>
          <tr>
            {tableColumnNames.map((name: string, index: number) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showAddNewRecordFields && (
            <CreateNewRecord
              fields={tableFields}
              submitFunction={addNewRecordFunc}
            />
          )}
          {/* {loading && <Loader />}
          {showAddUserFields && <AddNewUser />}
          <CreateRows users={users} /> */}
          <RenderRows
            fields={tableFields}
            records={records}
            deleteRecordFunc={deleteRecordFunc}
          />
        </tbody>
      </table>
    </section>
  );
}

interface RenderRowsProps {
  records: Record[];
  fields: FieldInfo[];
  deleteRecordFunc: Function;
}

function RenderRows({ fields, records, deleteRecordFunc }: RenderRowsProps) {
  const [editRowId, setEditRowId] = useState<string>('');

  const rows = records.map((record: Record) => {
    const isEdit = record.id === editRowId;

    return (
      <CreateTableRow
        {...record}
        fields={fields}
        isEdit={isEdit}
        setEditRowId={(id: string) => setEditRowId(id)}
        deleteRecordFunc={deleteRecordFunc}
      />
    );
  });

  return rows;
}

export default CustomTable;
