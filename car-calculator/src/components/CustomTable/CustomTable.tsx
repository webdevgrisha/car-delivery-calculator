import { useCallback, useEffect, useRef, useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord } from '.';
import { FieldData, TableRecord } from './interfaces';
import RenderRows from './RenderRows/RenderRows';
import { Id, toast } from 'react-toastify';
import { showErrorToastMessage, showUpdateToast } from './tableToast';
import Papa from 'papaparse';
import { FieldInfo } from './types';

interface CustomTableProps {
  tableIcon: React.ReactNode;
  tableName: string;
  columnNames: string[];
  tableFields: FieldInfo[];
  records: TableRecord[];
  searchBy: string;
  searchInputText: string;
  addNewRecordFunc: Function;
  deleteRecordFunc: Function;
  editRecordFunc: Function;
  createTableFormCSV: Function;
}

function CustomTable({
  tableIcon,
  tableName = '',
  columnNames,
  tableFields,
  records,
  searchBy,
  searchInputText,
  addNewRecordFunc,
  deleteRecordFunc,
  editRecordFunc,
  createTableFormCSV,
}: CustomTableProps) {
  const addFileInputRef = useRef<HTMLInputElement | null>(null);

  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);
  const [filterRecords, setFilterRecords] = useState<TableRecord[]>(records);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

  const handleInputSearch = (searchTerm: string = '') => {
    const filteredResult: TableRecord[] = filterBy(
      searchBy,
      records,
      searchTerm,
    );

    setFilterRecords(filteredResult);
  };

  const handleAddCsv = () => addFileInputRef.current?.click();

  const handleAddNewRecord = () => setShowAddNewRecordFields(true);

  const handleFileAdd = (file: File) => {
    if (!file) return;

    if (file.type !== 'text/csv') {
      showErrorToastMessage();
      return;
    }

    const toastId: Id = toast.loading('Please wait...');

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        console.log(typeof result);
        console.log(result.data);
        console.log('JSON: ', JSON.stringify(result.data));

        createTableFormCSV(JSON.stringify(result.data)).then(({ data }) => {
          const status = 'message' in data ? 'success' : 'error';
          const message: string = data.message || data.error;

          showUpdateToast(toastId, message, status);
        });
      },
    });
  };

  return (
    <section className="table-section">
      <header>
        <div className="icon">{tableIcon}</div>
        <h2>{tableName}</h2>
        <input
          type="search"
          placeholder={`Search by ${searchInputText}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleInputSearch(e.target.value)
          }
        />

        <input
          ref={addFileInputRef}
          onChange={(e) => {
            handleFileAdd(e.target.files?.[0]);
            e.target.value = '';
          }}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
        />
        <button onClick={handleAddCsv}>Add csv</button>
        <button onClick={handleAddNewRecord}>Add New</button>
      </header>
      <table className="custom-table">
        <thead>
          <tr>
            {columnNames.map((name: string, index: number) => (
              <th key={index}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {showAddNewRecordFields && (
            <CreateNewRecord
              fields={tableFields}
              addNewRecordFunc={addNewRecordFunc}
            />
          )}
          <RenderRows
            columnNames={columnNames}
            fields={tableFields}
            records={filterRecords}
            deleteRecordFunc={deleteRecordFunc}
            editRecordFunc={editRecordFunc}
          />
        </tbody>
      </table>
    </section>
  );
}

function filterBy(colName: string, records: TableRecord[], searchTerm: string) {
  const isColNameExist = colName in records[0].rowData;

  if (!isColNameExist || searchTerm === '') return records;

  const filteredRecord: TableRecord[] = records.filter(
    (record: TableRecord) => {
      const rowData: FieldData = record.rowData;

      return rowData[colName]
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    },
  );

  return filteredRecord;
}

export default CustomTable;
