import { useEffect, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import Loader from '../Loader/Loader';
import { SVG_Ports, SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { FieldInfo, TableData } from '../../CustomTable/types';
import {
  createShippingPortsFieldsConfig,
  createDestinationPortsFieldsConfig,
} from './fields';
import useFields from '../hooks/useFields';

function MyPorts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [shippingPortsTableData, setShippingPortsTableData] =
    useState<TableData>([]);
  const [destinationPortsTableData, setDestinationPortsTableData] =
    useState<TableData>([]);

  const destinationPortsFields = useFields(createDestinationPortsFieldsConfig) as FieldInfo[];
  const shippingPortsFields = useFields(createShippingPortsFieldsConfig) as FieldInfo[];

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'shipping_ports_(from)',
        'To Port',
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
        'Destination',
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
        columnNames={['To Port']}
        fields={shippingPortsFields}
        records={shippingPortsTableData}
        searchBy="To Port"
        searchInputText="port name"
        {...createActionFunctions('shipping_ports_(from)')}
      />

      <CustomTable
        tableIcon={<SVG_Ship />}
        tableName="Destination ports (to)"
        columnNames={['Destination']}
        fields={destinationPortsFields}
        records={destinationPortsTableData}
        searchBy="Destination"
        searchInputText="Destination port"
        {...createActionFunctions('destination_ports_(to)')}
      />
    </>
  );
}

export default MyPorts;
