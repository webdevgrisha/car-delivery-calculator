import { useState } from 'react';
import { SVG_Tax } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import useCreateActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import createFiledConfig from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function Clo() {
  const [tableData, setTableData] = useState<TableData>([]);

  const fields = createFiledConfig();

  useTableSubscriptiontsts(
    'clo_taxes',
    'Transport type',
    setTableData,
  );

  console.log('TableData: ', tableData);

  return (
    <>
      <CustomTable
        tableIcon={<SVG_Tax />}
        tableName="Clo"
        columnNames={['Transport type', 'Clo']}
        fields={fields}
        records={tableData}
        {...useCreateActionFunctions('clo_taxes')}
      />
    </>
  );
}

export default Clo;
