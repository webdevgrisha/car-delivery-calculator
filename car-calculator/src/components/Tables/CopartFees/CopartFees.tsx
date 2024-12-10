import './CopartFees.css'
import { useState } from 'react';
import { SVG_Auction, SVG_Fees } from '../../../assets';
import CustomTable from '../../CustomTable/CustomTable';
import createActionFunctions from '../hooks/useCreateActionFunctions';
import { TableData } from '../../CustomTable/types';
import { createCopartBuyerFeeFieldsConfig, createCopartConstFeeFieldsConfig } from './fields';
import { useTableSubscriptiontsts } from '../../../hooks';

function CopartFees() {
  const [CopartActionBuyerFeeData, setCopartBuyerFeeData] = useState<TableData>([]);
  const [CopartActionConstFeeData, setCopartActionConstFeeData] =
    useState<TableData>([]);

  const CopartBuyerFeeFields = createCopartBuyerFeeFieldsConfig();
  const CopartConstFeeFields = createCopartConstFeeFieldsConfig();

  useTableSubscriptiontsts(
    'copart_auction_client_fee',
    'Cena sprzedaży',
    setCopartBuyerFeeData,
    'front',
  );

  useTableSubscriptiontsts(
    'copart_auction_const_fee',
    'Environmental Fee',
    setCopartActionConstFeeData,
  );

  return (
    <div className='tables-wrapper'>
      <CustomTable
        tableIcon={<SVG_Auction />}
        tableName="Zbiór aukcyjny"
        columnNames={[
          'Cena sprzedaży',
          'Wysokość prowizji',
          'LiveBid',
        ]}
        fields={CopartBuyerFeeFields}
        records={CopartActionBuyerFeeData}
        searchBy="cena sprzedaży"
        searchInputText="Cena sprzedaży"
        {...createActionFunctions('copart_auction_client_fee')}
      />

      <CustomTable
        tableIcon={<SVG_Fees />}
        tableName="Stały zbiór aukcyjny"
        columnNames={['Environmental Fee', 'Gate Fee']}
        fields={CopartConstFeeFields}
        records={CopartActionConstFeeData}
        {...createActionFunctions('copart_auction_const_fee')}
      />
    </div>
  );
}

export default CopartFees;
