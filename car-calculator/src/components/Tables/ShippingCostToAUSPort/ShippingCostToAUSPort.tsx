import { useEffect, useMemo, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import {
  createTableFromJSON,
  deleteTableRecord,
  editTableRecord,
  createTableRecord,
} from '../../../services/firebase/functions';
import Loader from '../Loader/Loader';
import { SVG_Ports } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import {
  CreateTableRecord,
  DeleteTableRowData,
  EditTableData,
} from '../interfaces';

interface TableData {
  id: string;
  rowData: string[];
}

const fields = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'Port',
      placeholder: 'Port',
      type: 'text',
      defaultValue: '',
    },
  },
];

const fieldsValidateFuncs = {
  Port: portValidation,
};

function ShippingCostToAUSPort() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData[]>([]);

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'shipping_cost_to_a_US_port',
        setTableData,
      );
    };

    subcribe();

    return () => {
      if (unsubscribeFunc) unsubscribeFunc();
    };
  }, []);

  console.log('records: ', tableData);
  return (
    <>
      {/* Custom table */}
      <CustomTable
        tableIcon={<SVG_Ports />}
        tableName="Ports"
        tableColumnNames={['Port']}
        tableFields={fields}
        records={tableData}
        fieldsValidateFuncs={fieldsValidateFuncs}
        searchBy="displayName"
        searchInputText="name"
        addNewRecordFunc={(data: CreateTableRecord) => {
          return createTableRecord({
            tableName: 'shipping_cost_to_a_US_port',
            recordData: data,
          });
        }}
        deleteRecordFunc={(obj: DeleteTableRowData) => {
          return deleteTableRecord({
            tableName: 'shipping_cost_to_a_US_port',
            id: obj.id,
          });
        }}
        editRecordFunc={(data: EditTableData) => {
          return editTableRecord({
            tableName: 'shipping_cost_to_a_US_port',
            ...data,
          });
        }}
        createTableFormJSON={(file: string) => {
          return createTableFromJSON({
            tableName: 'shipping_cost_to_a_US_port',
            parseArr: file,
          });
        }}
      />
    </>
  );
}
function portValidation(value: string) {
  const regExp = /^[a-z]+/i;

  return regExp.test(value);
}

export default ShippingCostToAUSPort;
