import { useEffect, useState } from 'react';
import { CreateNewRecord } from '.';
import { AddFunc, DeleteFunc, EditFunc, TableRecord } from './interfaces';
import RenderRows from './RenderRows/RenderRows';
import { FieldInfo } from './types';

interface UserTableProps {
  tableIcon: React.ReactNode;
  tableName: string;
  tableColumnNames: string[];
  tableFields: FieldInfo[];
  records: TableRecord[];
  searchBy: string;
  searchInputText: string;
  addNewUserFunc: AddFunc;
  deleteUserFunc: DeleteFunc;
  editUserFunc: EditFunc;
}

function UserTable({
  tableIcon,
  tableName = '',
  tableColumnNames,
  tableFields,
  records,
  searchBy,
  searchInputText,
  addNewUserFunc,
  deleteUserFunc,
  editUserFunc,
}: UserTableProps) {
  const [showAddNewRecordFields, setShowAddNewRecordFields] =
    useState<boolean>(false);
  const [filterRecords, setFilterRecords] = useState<TableRecord[]>(records);

  useEffect(() => {
    setFilterRecords(records);
  }, [records]);

  const handleInputSearch = (newValue: string = '') => {
    const filteredResult: TableRecord[] = filterBy(
      searchBy,
      tableFields,
      records,
      newValue,
    );

    console.log('filterdResult: ', filteredResult);

    setFilterRecords(filteredResult);
  };

  const handleAddNewUser = () => setShowAddNewRecordFields(true);

  console.log('records: ', records);
  // debugger;

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

        <button onClick={handleAddNewUser}>Add New</button>
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
              addNewUserFunc={addNewUserFunc}
            />
          )}
          <RenderRows
            fields={tableFields}
            records={filterRecords}
            deleteUserFunc={deleteUserFunc}
            editUserFunc={editUserFunc}
          />
        </tbody>
      </table>
    </section>
  );
}

// стоит ли импортировать из CustomTable ?
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

  const filteredRecord: TableRecord[] = records.filter(
    (record: TableRecord) => {
      const rowData: string[] = record.userData;

      return rowData[searchIndex]
        .toLowerCase()
        .startsWith(searchTerm.toLowerCase());
    },
  );

  return filteredRecord;
}

export default UserTable;
