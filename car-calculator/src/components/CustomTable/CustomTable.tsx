import { useCallback, useEffect, useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord, CreateTableRow } from '.';
import { FieldInfo, Record } from './interfaces';

interface CustomTableProps {
  tableIconPath: string;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
  records: Record[];
  searchBy: string;
  addNewRecordFunc: Function;
  deleteRecordFunc: Function;
}

function CustomTable({
  tableIconPath,
  tableName = '',
  tableColumnNames,
  tableFields,
  records,
  searchBy,
  addNewRecordFunc,
  deleteRecordFunc,
}: CustomTableProps) {
  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);
  const [filterRecords, setFilterRecords] = useState<Record[]>(records);

  // console.log('records:', records);
  // console.log('filterRecords: ', filterRecords);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

  // почему если убрать records и преключиться между вкладками в приложении поиск перстает работать ?
  const handleInputSearch = useCallback(
    (newValue: string = '') => {
      const filterdResult: Record[] = filterBy(
        searchBy,
        tableFields,
        records,
        newValue,
      );

      console.log('filterdResult: ', filterdResult);

      setFilterRecords(filterdResult);
    },
    [records],
  );

  const handleAddNewRecord = useCallback(
    () => setShowAddNewRecordFields(true),
    [],
  );

  return (
    <section className="table-section">
      <header>
        <div className="icon">
          <img src={`/${tableIconPath}`} alt="table-icon" />
        </div>
        <h2>{tableName}</h2>
        <input
          type="search"
          placeholder={`Search by ${searchBy}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputSearch(e.target.value)
          }
        />
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
          <RenderRows
            fields={tableFields}
            records={filterRecords}
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

function filterBy(
  colName: string,
  tableFields: FieldInfo[],
  records: Record[],
  searchTerm: string,
) {
  const searchIndex = tableFields.findIndex((field: FieldInfo) => {
    const fieldConfig = field.fieldConfig;

    return fieldConfig.name === colName;
  });

  console.log('search term: ', searchTerm);
  console.log('is equal: ', searchTerm === '');
  console.log('records: ', records);
  if (searchIndex === -1 || searchTerm === '') return records;

  const filterdRecord: Record[] = records.filter((record: Record) => {
    const rowData: string[] = record.rowData;

    return rowData[searchIndex]
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
  });

  return filterdRecord;
}

export default CustomTable;
