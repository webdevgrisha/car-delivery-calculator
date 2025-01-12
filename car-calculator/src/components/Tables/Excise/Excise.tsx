import { useState } from 'react';
import { SVG_Tax } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import useCreateActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import createFiledConfig from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function Tax() {
  const [tableData, setTableData] = useState<TableData>([]);

  const fields = createFiledConfig();

  useTableSubscriptiontsts(
    'excise_taxes',
    'Pojemność silnika',
    setTableData,
  );

  console.log('TableData: ', tableData);

  return (
    <>
      <CustomTable
        tableIcon={<SVG_Tax />}
        tableName="Akcyza"
        columnNames={['Pojemność silnika', 'Stawka akcyzy']}
        fields={fields}
        records={tableData}
        {...useCreateActionFunctions('excise_taxes')}
      />
    </>
  );
}

export default Tax;
