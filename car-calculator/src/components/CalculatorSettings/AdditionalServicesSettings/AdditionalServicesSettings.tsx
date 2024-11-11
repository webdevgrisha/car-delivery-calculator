import { useImmerReducer } from 'use-immer';
import SettingsTable from './SettingsTable/SettingsTable';
import {
  HandleFieldChange,
  InitActionData,
  ResponseData,
  ServiceAction,
  ServiceData,
  TableContext,
} from './interfaces';
import { useRef } from 'react';
import { Action } from './types';
import { useTableSubscriptiontsts } from '../../../hooks';
import { showUpdateToast } from '../../CustomTable/tableToast';
import { Id, toast } from 'react-toastify';
import { updateCalculatorSettingsData } from '../../../services/firebase/functions';
import tableReducer from './tableReducer';
import { AdditionaServiceTableContext } from './AdditionaServiceTableContext';

import './AdditionalServicesSettings.css';
import { generateRowId } from '../../../services/firebase/firestoreDb';

function AdditionalServicesSettings() {
  const [services, dispatch] = useImmerReducer<ServiceData[], Action>(
    tableReducer,
    [],
  );
  const servicesAction = useRef<ServiceAction>({});

  useTableSubscriptiontsts('additional_services', 'rowName', (initServices) => {
    console.log('effect services: ', initServices);
    dispatch({ type: 'init', initServices } as InitActionData);
  });

  const handleFieldChange: HandleFieldChange = (id, name, value) => {
    dispatch({
      type: 'edit',
      rowId: id,
      rowName: name,
      newValue: value,
      servicesAction: servicesAction.current,
    });
  };

  const handleServiceDelete = (id: string): void => {
    dispatch({
      type: 'delete',
      rowId: id,
      servicesAction: servicesAction.current,
    });
  };

  const handleAddService = async () => {
    const serviceId = await generateRowId('additional_services');
    dispatch({
      type: 'add',
      rowId: serviceId,
      servicesAction: servicesAction.current,
    });
  };

  // стоит ли вынести в reduce ?
  const handleSaveCahnge = () => {
    dispatch({ type: 'save' });

    const toastId: Id = toast.loading('Please wait...');

    const invalidServices = services.filter((service) => service.rowData.error);

    if (invalidServices.length) {
      showUpdateToast(
        toastId,
        "The price can't be less than zero or empty",
        'error',
      );

      return;
    }

    const actionToUpdate = Object.values(servicesAction.current);

    if (!actionToUpdate.length) {
      showUpdateToast(toastId, `There's nothing to update!`, 'warning');
      return;
    }

    updateCalculatorSettingsData({
      tableName: 'additional_services',
      tableAction: actionToUpdate,
    }).then((result) => {
      const data = result.data as ResponseData;

      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error || 'Unkown error!';

      showUpdateToast(toastId, message, status);

      servicesAction.current = {};
    });
  };

  const additionaServiceTableContextValue: TableContext = {
    tableRows: services,
    deleteRecordFunc: handleServiceDelete,
    editRecordFunc: handleFieldChange,
  };

  return (
    <section className="additional-services-settings">
      <div className="container">
        <header>
          <h5>Dodatkowe usługi</h5>
        </header>
        <AdditionaServiceTableContext.Provider
          value={additionaServiceTableContextValue}
        >
          <SettingsTable />
        </AdditionaServiceTableContext.Provider>
        <footer>
          <button className="btn add" onClick={handleAddService}>
            Add Field
          </button>
          <button className="btn save" onClick={handleSaveCahnge}>
            Save
          </button>
        </footer>
      </div>
    </section>
  );
}

export default AdditionalServicesSettings;
