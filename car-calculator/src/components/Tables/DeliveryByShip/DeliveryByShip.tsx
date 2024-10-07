import { useEffect, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import Loader from '../Loader/Loader';
import { SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import fields from './fields';

function DeliveryByShip() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData>([]);

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'delivery_by_ship',
        'From',
        setTableData,
      );
    };

    subcribe();

    return () => {
      if (unsubscribeFunc) unsubscribeFunc();
    };
  }, []);

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
        tableFields={fields}
        records={tableData}
        searchBy="From"
        searchInputText="from port"
        {...createActionFunctions('delivery_by_ship')}
      />
    </>
  );
}

export default DeliveryByShip;
