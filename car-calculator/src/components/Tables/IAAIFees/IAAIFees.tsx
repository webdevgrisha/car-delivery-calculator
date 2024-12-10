import './IAAIFees.css'
import { useState } from 'react';
import { SVG_Auction, SVG_Fees } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import { createIAAIBuyerFeeFieldsConfig, createIAAIConstFeeFieldsConfig } from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function IAAIFees() {
  const [IAAIActionBuyerFeeData, setIAAIBuyerFeeData] = useState<TableData>([]);
  const [IAAIActionConstFeeData, setIAAIActionConstFeeData] =
    useState<TableData>([]);

  const IAAIBuyerFeeFields = createIAAIBuyerFeeFieldsConfig();
  const IAAIConstFeeFields = createIAAIConstFeeFieldsConfig();

  useTableSubscriptiontsts(
    'iaai_auction_client_fee',
    'Cena sprzedaży',
    setIAAIBuyerFeeData,
    'front',
  );

  useTableSubscriptiontsts(
    'iaai_auction_const_fee',
    'Service Fee',
    setIAAIActionConstFeeData,
  );

  return (
    <div className='tables-wrapper'>
      <CustomTable
        tableIcon={<SVG_Auction />}
        tableName="Zbiór aukcyjny"
        columnNames={[
          'Cena sprzedaży',
          'Wysokość prowizji (Buyer)',
          'Wysokość prowizji (Internal)',
        ]}
        fields={IAAIBuyerFeeFields}
        records={IAAIActionBuyerFeeData}
        searchBy="Cena sprzedaży"
        searchInputText="Cena sprzedaży"
        {...createActionFunctions('iaai_auction_client_fee')}
      />

      <CustomTable
        tableIcon={<SVG_Fees />}
        tableName="Stały zbiór aukcyjny"
        columnNames={['Service Fee', 'Environmental Fee', 'Broker Fee']}
        fields={IAAIConstFeeFields}
        records={IAAIActionConstFeeData}
        {...createActionFunctions('iaai_auction_const_fee')}
      />
    </div>
  );
}

export default IAAIFees;
