import { useEffect, useMemo, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import Loader from '../Loader/Loader';
import { SVG_Ports, SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../tableActionFunctions';

interface TableData {
  id: string;
  rowData: string[];
}

const shippingPortsFields = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'To port',
      placeholder: 'To port',
      type: 'text',
      defaultValue: '',
    },
  },
];

const destinationPortsFields = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'To port',
      placeholder: 'To port',
      type: 'text',
      defaultValue: '',
    },
  },
];

const fieldsValidateFuncs = {
  'To port': portValidation,
};

function MyPorts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [shippingPortsTableData, setShippingPortsTableData] = useState<
    TableData[]
  >([]);
  const [destinationPortsTableData, setDestinationPortsTableData] = useState<
    TableData[]
  >([]);

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'shipping_ports_(from)',
        setShippingPortsTableData,
      );
    };

    subcribe();

    return () => {
      if (unsubscribeFunc) unsubscribeFunc();
    };
  }, []);

  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'destination_ports_(to)',
        setDestinationPortsTableData,
      );
    };

    subcribe();

    return () => {
      if (unsubscribeFunc) unsubscribeFunc();
    };
  }, []);

  return (
    <>
      <CustomTable
        tableIcon={<SVG_Ports />}
        tableName="Shipping ports (from)"
        tableColumnNames={['To port']}
        tableFields={shippingPortsFields}
        records={shippingPortsTableData}
        fieldsValidateFuncs={fieldsValidateFuncs}
        searchBy="To port"
        searchInputText="port name"
        {...createActionFunctions('shipping_ports_(from)')}
      />
      <CustomTable
        tableIcon={<SVG_Ship />}
        tableName="Destination ports (to)"
        tableColumnNames={['Destination']}
        tableFields={destinationPortsFields}
        records={destinationPortsTableData}
        fieldsValidateFuncs={fieldsValidateFuncs}
        searchBy="Destination"
        searchInputText="Destination port"
        {...createActionFunctions('destination_ports_(to)')}
      />
    </>
  );
}
function portValidation(value: string) {
  const regExp = /^[a-z]+/i;

  return regExp.test(value);
}

export default MyPorts;
