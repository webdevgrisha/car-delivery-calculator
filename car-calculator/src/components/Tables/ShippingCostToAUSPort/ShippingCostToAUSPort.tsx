import { useState } from 'react';
import { SVG_Laveta } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import useCreateActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import createFiledConfig from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function ShippingCostToAUSPort() {
  const [tableData, setTableData] = useState<TableData>([]);

  const fields = createFiledConfig();

  useTableSubscriptiontsts(
    'shipping_cost_to_a_US_port',
    'Location',
    setTableData,
  );

  console.log('TableData: ', tableData);

  return (
    <>
      <CustomTable
        tableIcon={<SVG_Laveta />}
        tableName="Shipping Cost To A US Port"
        columnNames={[
          'Location',
          'To Port',
          'Sedan',
          'Suv',
          'Duży Suv',
          'Pickup',
          'Van',
          'Motor',
        ]}
        fields={fields}
        records={tableData}
        searchBy="Location"
        searchInputText="location"
        {...useCreateActionFunctions('shipping_cost_to_a_US_port')}
      />
    </>
  );
}

export default ShippingCostToAUSPort;
