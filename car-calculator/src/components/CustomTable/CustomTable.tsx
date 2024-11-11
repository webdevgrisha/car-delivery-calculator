import { useEffect, useRef, useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord } from '.';
import {
  FieldData,
  ResponseData,
  TableContext,
  TableRecord,
} from './interfaces';
import RenderRows from './RenderRows/RenderRows';
import { Id, toast } from 'react-toastify';
import { showErrorToastMessage, showUpdateToast } from './tableToast';
import Papa from 'papaparse';
import { FieldInfo } from './types';
import { CustomTableContext } from './tableContext';

interface CustomTableProps {
  tableIcon: React.ReactNode;
  tableName: string;
  columnNames: string[];
  fields: FieldInfo[];
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
  fields,
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

  const customTableContextValue: TableContext = {
    columnNames,
    fields,
    records: filterRecords,
    addNewRecordFunc,
    deleteRecordFunc,
    editRecordFunc,
  };

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

  const handleFileAdd = async (file: File) => {
    if (!file) return;

    if (String(file.type) !== 'text/csv') {
      showErrorToastMessage('Wrong file type. The file type should be csv');
      return;
    }

    if (!(await isCSVValid(columnNames, file))) {
      showErrorToastMessage(
        'Column names of the CSV file do not match the table column names',
      );
      return;
    }

    const toastId: Id = toast.loading('Please wait...');

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        console.log(typeof result);
        console.log(result.data);
        console.log('JSON: ', JSON.stringify(result.data));

        createTableFormCSV(JSON.stringify(result.data)).then(
          ({ data }: { data: ResponseData }) => {
            const status = 'message' in data ? 'success' : 'error';
            const message: string =
              data.message || data.error || 'Unkown Error';

            showUpdateToast(toastId, message, status);
          },
        );
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
            const file = e.target.files?.[0];

            if (file !== undefined) handleFileAdd(file);

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
          <CustomTableContext.Provider value={customTableContextValue}>
            {showAddNewRecordFields && <CreateNewRecord />}

            <RenderRows />
          </CustomTableContext.Provider>
        </tbody>
      </table>
    </section>
  );
}

async function isCSVValid(columnNames: string[], file: File) {
  const headers = await new Promise<string[]>((resolve, reject) =>
    Papa.parse(file, {
      preview: 1,
      header: false,
      complete: (result) => {
        resolve(result.data[0] as string[]);
        console.log('headers: ', result.data);
      },
      error: (error) => {
        console.log(error);
        reject(false);
      },
    }),
  );

  console.log('JSON header: ', JSON.stringify(headers));
  console.log('JSON columnNames: ', JSON.stringify(columnNames));

  const isEqual: boolean =
    JSON.stringify(columnNames) === JSON.stringify(headers);

  console.log('iseEqual: ', isEqual);
  return isEqual;
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
