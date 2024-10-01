import { useCallback, useEffect, useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord, CreateTableRow } from '.';
import { FieldInfo, FieldsValidateFuncs, Record } from './interfaces';
import RenderRows from './RenderRows/RenderRows';

interface CustomTableProps {
  tableIconPath: string;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
  records: Record[];
  fieldsValidateFuncs: FieldsValidateFuncs;
  searchBy: string;
  searchInputText: string;
  addNewRecordFunc: Function;
  deleteRecordFunc: Function;
  editRecordFunc: Function;
}

function CustomTable({
  tableIconPath,
  tableName = '',
  tableColumnNames,
  tableFields,
  records,
  searchBy,
  searchInputText,
  fieldsValidateFuncs,
  addNewRecordFunc,
  deleteRecordFunc,
  editRecordFunc,
}: CustomTableProps) {
  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);
  const [filterRecords, setFilterRecords] = useState<Record[]>(records);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

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

  const handleAddNewRecord = () => setShowAddNewRecordFields(true);

  return (
    <section className="table-section">
      <header>
        <div className="icon">
          <img src={`/${tableIconPath}`} alt="table-icon" />
        </div>
        <h2>{tableName}</h2>
        <input
          type="search"
          placeholder={`Search by ${searchInputText}`}
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
              addNewRecordFunc={addNewRecordFunc}
              fieldsValidateFuncs={fieldsValidateFuncs}
            />
          )}
          <RenderRows
            fields={tableFields}
            records={filterRecords}
            fieldsValidateFuncs={fieldsValidateFuncs}
            deleteRecordFunc={deleteRecordFunc}
            editRecordFunc={editRecordFunc}
          />
        </tbody>
      </table>
    </section>
  );
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
