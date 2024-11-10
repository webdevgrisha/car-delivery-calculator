import { useState } from 'react';
import { SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import createFieldsConfig from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function DeliveryByShip() {
  const [tableData, setTableData] = useState<TableData>([]);

  // const fields = useFields(createFieldsConfig) as FieldInfo[];

  const fields = createFieldsConfig();

  useTableSubscriptiontsts('delivery_by_ship', 'From', setTableData);

  console.log('TableData: ', tableData);

  return (
    <>
      <CustomTable
        tableIcon={<SVG_Ship />}
        tableName="Delivery by ship"
        columnNames={[
          'From',
          'Destination',
          'Sedan',
          'Suv',
          'Duży Suv',
          'Pickup',
          'Van',
          'Motor',
        ]}
        fields={fields}
        records={tableData}
        searchBy="From"
        searchInputText="from port"
        {...createActionFunctions('delivery_by_ship')}
      />
    </>
  );
}

export default DeliveryByShip;
