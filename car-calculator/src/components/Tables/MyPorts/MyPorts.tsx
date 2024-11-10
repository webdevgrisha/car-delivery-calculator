import { useState } from 'react';
import { SVG_Ports, SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import {
  createShippingPortsFieldsConfig,
  createDestinationPortsFieldsConfig,
} from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function MyPorts() {
  const [shippingPortsTableData, setShippingPortsTableData] =
    useState<TableData>([]);
  const [destinationPortsTableData, setDestinationPortsTableData] =
    useState<TableData>([]);

  const shippingPortsFields = createShippingPortsFieldsConfig();
  const destinationPortsFields = createDestinationPortsFieldsConfig();

  useTableSubscriptiontsts(
    'shipping_ports_(from)',
    'To Port',
    setShippingPortsTableData,
  );

  useTableSubscriptiontsts(
    'destination_ports_(to)',
    'Destination',
    setDestinationPortsTableData,
  );

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
