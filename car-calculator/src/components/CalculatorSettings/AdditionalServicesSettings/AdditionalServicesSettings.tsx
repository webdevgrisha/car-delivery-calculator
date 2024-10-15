import { useImmer } from 'use-immer';
import './AdditionalServicesSettings.css';
import SettingsTable from './SettingsTable/SettingsTable';
import { ServiceData } from './SettingsTable/interfaces';
import { generateRowId } from '../../../services/firebase/firestoreDb';

// interface ServiceData {
//   service_id: string;
//   service_name: string;
//   currency: Currency;
//   price: number;
//   isShown: boolean;
// }

const config: ServiceData[] = [
  {
    service_id: '1',
    service_name: 'bobr',
    currency: 'USD',
    price: '10',
    isShown: true,
  },
];

function AdditionalServicesSettings() {
  const [services, setServices] = useImmer<ServiceData[]>(config);

  const handleFieldChange = (
    id: string,
    name: string,
    value: string | boolean,
  ): void => {
    setServices((draft) => {
      const service = draft.find((service) => service.service_id === id);

      if (service) {
        service[name] = value;
      }
    });
  };

  const handleServiceDelete = (id: string): void => {
    setServices((draft) => {
      const serviceIndex = draft.findIndex(
        (service) => service.service_id === id,
      );

      if (serviceIndex !== -1) {
        draft.splice(serviceIndex, 1);
      }
    });
  };

  const handleAddField = async () => {
    const service_id: string = await generateRowId('services');
    setServices((draft) => {
      draft.push({
        service_id: service_id,
        service_name: '',
        currency: 'PLN',
        price: '',
        isShown: true,
      });
    });
  };

  return (
    <section className="additional-services-settings">
      <div className="container">
        <header>
          <h5>Dodatkowe usługi</h5>
        </header>
        <SettingsTable
          services={services}
          handleFieldChange={handleFieldChange}
          handleServiceDelete={handleServiceDelete}
        />
        <footer>
          <button className="btn add" onClick={handleAddField}>
            Add Field
          </button>
          <button className="btn save">Save</button>
        </footer>
      </div>
    </section>
  );
}

export default AdditionalServicesSettings;
