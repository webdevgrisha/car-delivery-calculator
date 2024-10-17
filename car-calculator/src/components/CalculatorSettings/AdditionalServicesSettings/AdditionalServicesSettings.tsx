import { useImmer } from 'use-immer';
import './AdditionalServicesSettings.css';
import SettingsTable from './SettingsTable/SettingsTable';
import {
  InvalidServicesIds,
  RowData,
  ServiceData,
} from './SettingsTable/interfaces';
import { generateRowId } from '../../../services/firebase/firestoreDb';
import { useRef } from 'react';
import {
  createServiceAction,
  deleteServiceAction,
  editServiceAction,
} from './SettingsTable/serviceActionFunctions';
import { ServiceAction } from './SettingsTable/types';
import { useTableSubscriptiontsts } from '../../../hooks';
import { showUpdateToast } from '../../CustomTable/tableToast';
import { Id, toast } from 'react-toastify';
import { updateServicesData } from '../../../services/firebase/functions';


function AdditionalServicesSettings() {
  const [services, setServices] = useImmer<ServiceData[]>([]);
  const servicesAction = useRef<ServiceAction[]>([]);
  const [invalidServicesIds, setInvalidServicesIds] =
    useImmer<InvalidServicesIds>({});

  useTableSubscriptiontsts('additional_services', 'service_name', setServices);

  const handleFieldChange = <K extends keyof ServiceData['rowData']>(
    id: string,
    name: K,
    value: ServiceData['rowData'][K],
  ): void => {
    setServices((draft) => {
      const serviceIndex = draft.findIndex((service) => service.id === id);

      if (serviceIndex !== -1) {
        draft[serviceIndex].rowData[name] = value;
      }
    });

    console.log(id, name, value);
    editServiceAction(servicesAction.current, id, name, value);

    setInvalidServicesIds((draft) => {
      if (id in draft && draft[id]) {
        draft[id] = false;
      }
    });
  };

  const handleServiceDelete = (id: string): void => {
    setServices((draft) => {
      const serviceIndex = draft.findIndex((service) => service.id === id);

      if (serviceIndex !== -1) {
        draft.splice(serviceIndex, 1);
      }
    });

    deleteServiceAction(servicesAction.current, id);
  };

  const handleAddField = async () => {
    const service_id: string = await generateRowId('services');

    const rowData: RowData = {
      service_name: '',
      currency: 'PLN',
      price: '0',
      isShown: true,
    };

    const config: ServiceData = {
      id: service_id,
      rowData,
    };

    setServices((draft) => {
      draft.push(config);
    });

    createServiceAction(servicesAction.current, service_id, rowData);
  };

  const handleSaveCahnge = () => {
    const toastId: Id = toast.loading('Please wait...');

    const invalidServicesIds = services
      .filter(
        (service) => +service.rowData.price < 0 || service.rowData.price === '',
      )
      .reduce((newInvalidObj, services) => {
        const { id } = services;

        newInvalidObj[id] = true;

        return newInvalidObj;
      }, {} as InvalidServicesIds);

    setInvalidServicesIds(() => invalidServicesIds);

    if (Object.keys(invalidServicesIds).length) {
      showUpdateToast(
        toastId,
        "the price can't be less than zero or empty",
        'error',
      );
    }

    updateServicesData({
      tableName: 'additional_services',
      servicesAction: servicesAction.current,
    }).then(({ data }) => {
      const status = 'message' in data ? 'success' : 'error';

      const message: string = data.message || data.error;

      showUpdateToast(toastId, message, status);

      if (status !== 'error') setNewRecordData(newRecordDataConfig);
    });
  };

  console.log('servicesAction:', servicesAction.current);

  return (
    <section className="additional-services-settings">
      <div className="container">
        <header>
          <h5>Dodatkowe usługi</h5>
        </header>
        <SettingsTable
          services={services}
          invalidServicesIds={invalidServicesIds}
          handleFieldChange={handleFieldChange}
          handleServiceDelete={handleServiceDelete}
        />
        <footer>
          <button className="btn add" onClick={handleAddField}>
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
