import { useCallback, useEffect, useRef, useState } from 'react';
import './CustomTable.css';
import { CreateNewRecord } from '.';
import { FieldInfo, FieldsValidateFuncs, TableRecord } from './interfaces';
import RenderRows from './RenderRows/RenderRows';
import { Id, toast } from 'react-toastify';
import { showErrorToastMessage, showUpdateToast } from './tableToast';
import Papa from 'papaparse';

interface CustomTableProps {
  tableIcon: React.ReactNode;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
  records: TableRecord[];
  fieldsValidateFuncs: FieldsValidateFuncs;
  searchBy: string;
  searchInputText: string;
  addNewRecordFunc: Function;
  deleteRecordFunc: Function;
  editRecordFunc: Function;
  createTableFormJSON?: Function;
}

function CustomTable({
  tableIcon,
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
  createTableFormJSON,
}: CustomTableProps) {
  const addFileInputRef = useRef<HTMLInputElement | null>(null);

  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);
  const [filterRecords, setFilterRecords] = useState<TableRecord[]>(records);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

  const handleInputSearch = useCallback(
    (newValue: string = '') => {
      const filterdResult: TableRecord[] = filterBy(
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

  const handleAddCsv = () => addFileInputRef.current?.click();

  const handleAddNewRecord = () => setShowAddNewRecordFields(true);

  const handleFileAdd = (file: File) => {
    if (!createTableFormJSON || !file) return;

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

        createTableFormJSON(JSON.stringify(result.data)).then(({ data }) => {
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
        <div className="icon">
          {tableIcon}
          {/* <img src={`/${tableIconPath}`} alt="table-icon" /> */}
        </div>
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
  records: TableRecord[],
  searchTerm: string,
) {
  const searchIndex = tableFields.findIndex((field: FieldInfo) => {
    const fieldConfig = field.fieldConfig;

    return fieldConfig.name === colName;
  });

  if (searchIndex === -1 || searchTerm === '') return records;

  const filterdRecord: TableRecord[] = records.filter((record: TableRecord) => {
    const rowData: string[] = record.rowData;

    return rowData[searchIndex]
      .toLowerCase()
      .startsWith(searchTerm.toLowerCase());
  });

  return filterdRecord;
}

export default CustomTable;
