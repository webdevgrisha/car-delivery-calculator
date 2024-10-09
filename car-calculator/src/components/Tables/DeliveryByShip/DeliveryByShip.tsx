import { useEffect, useState } from 'react';

import { subscribeOnTableUpdate } from '../../../services/firebase/firestoreDb';
import Loader from '../Loader/Loader';
import { SVG_Ship } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { FieldInfo, TableData } from '../../CustomTable/types';
import createFieldsConfig from './fields';
import useFields from '../hooks/useFields';

function DeliveryByShip() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tableData, setTableData] = useState<TableData>([]);

  const fields = useFields(createFieldsConfig) as FieldInfo[];

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
