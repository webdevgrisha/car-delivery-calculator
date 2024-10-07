import { useEffect, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import Loader from '../Loader/Loader';
import { SVG_Laveta } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import useCreateActionFunctions from '../useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import fields from './fields';

// стоит ли вынести в отдельный файл ?

function ShippingCostToAUSPort() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData>([]);

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnTableUpdate(
        'shipping_cost_to_a_US_port',
        'Location',
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
        tableIcon={<SVG_Laveta />}
        tableName="Shipping Cost To A US Port"
        columnNames={[
          'Auction',
          'Location',
          'State',
          'To Port',
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
        {...useCreateActionFunctions('shipping_cost_to_a_US_port')}
      />
    </>
  );
}

export default ShippingCostToAUSPort;
