import { FormEvent, useEffect, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';
import {
  createCalculatorConfiguration,
  deleteCalculatorConfiguration,
  renameCalculatorConfiguration,
} from '../../services/firebase/functions';
import { CalculatorConfiguration } from '../../services/calculatorConfigurations';
import { showUpdateToast } from '../CustomTable/tableToast';
import { SVG_Add, SVG_SelectArrow, SVG_Settings } from '../../assets';
import './CalculatorConfigurationPicker.css';

interface Props {
  configurations: CalculatorConfiguration[];
  value: string;
  onChange: (id: string) => void;
  onCreated?: (configuration: CalculatorConfiguration) => void;
  onRenamed?: (configuration: CalculatorConfiguration) => void;
  onDeleted?: (id: string) => void;
  variant?: 'calculator' | 'settings';
}

type FormMode = 'create' | 'rename' | null;

function CalculatorConfigurationPicker({
  configurations,
  value,
  onChange,
  onCreated,
  onRenamed,
  onDeleted,
  variant = 'calculator',
}: Props) {
  const [name, setName] = useState('');
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedConfiguration = configurations.find(
    (configuration) => configuration.id === value,
  );

  useEffect(() => {
    if (formMode) inputRef.current?.focus();
  }, [formMode]);

  const closeForm = () => {
    setName('');
    setFormMode(null);
  };

  const createConfiguration = (event: FormEvent) => {
    event.preventDefault();
    const configurationName = name.trim();
    if (
      formMode !== 'create' ||
      !configurationName ||
      !onCreated ||
      isSubmitting
    ) return;

    setIsSubmitting(true);
    const toastId: Id = toast.loading('Creating configuration...');
    createCalculatorConfiguration({
      name: configurationName,
      sourceConfigurationId: value,
    })
      .then(({ data }) => {
        const result = data as {
          configuration?: CalculatorConfiguration;
          error?: string;
        };
        if (!result.configuration) {
          showUpdateToast(toastId, result.error || 'Unknown error', 'error');
          setIsSubmitting(false);
          return;
        }

        onCreated(result.configuration);
        closeForm();
        setIsSubmitting(false);
        showUpdateToast(toastId, 'Configuration created', 'success');
      })
      .catch((error: Error) => {
        setIsSubmitting(false);
        showUpdateToast(toastId, error.message, 'error');
      });
  };

  const renameConfiguration = (event: FormEvent) => {
    event.preventDefault();
    const configurationName = name.trim();
    if (
      formMode !== 'rename' ||
      value === 'default' ||
      !configurationName ||
      !onRenamed ||
      isSubmitting
    ) return;

    setIsSubmitting(true);
    const toastId: Id = toast.loading('Renaming configuration...');
    renameCalculatorConfiguration({
      configurationId: value,
      name: configurationName,
    })
      .then(({ data }) => {
        const result = data as {
          configuration?: CalculatorConfiguration;
          error?: string;
        };
        if (!result.configuration) {
          showUpdateToast(toastId, result.error || 'Unknown error', 'error');
          setIsSubmitting(false);
          return;
        }

        onRenamed(result.configuration);
        closeForm();
        setIsSubmitting(false);
        showUpdateToast(toastId, 'Configuration renamed', 'success');
      })
      .catch((error: Error) => {
        setIsSubmitting(false);
        showUpdateToast(toastId, error.message, 'error');
      });
  };

  const deleteConfiguration = () => {
    if (value === 'default' || !onDeleted || isSubmitting) return;
    const configurationName = selectedConfiguration?.name || 'configuration';
    if (!window.confirm(`Delete “${configurationName}”? This cannot be undone.`)) {
      return;
    }

    setIsSubmitting(true);
    const toastId: Id = toast.loading('Deleting configuration...');
    deleteCalculatorConfiguration({configurationId: value})
      .then(({ data }) => {
        const result = data as {configurationId?: string; error?: string};
        if (!result.configurationId) {
          showUpdateToast(toastId, result.error || 'Unknown error', 'error');
          setIsSubmitting(false);
          return;
        }

        onDeleted(result.configurationId);
        closeForm();
        setIsSubmitting(false);
        showUpdateToast(toastId, 'Configuration deleted', 'success');
      })
      .catch((error: Error) => {
        setIsSubmitting(false);
        showUpdateToast(toastId, error.message, 'error');
      });
  };

  return (
    <section className={`calculator-configuration-picker ${variant}`}>
      <div className="configuration-summary">
        <span className="configuration-icon" aria-hidden="true">
          <SVG_Settings />
        </span>
        <div className="configuration-copy">
          <h2>
            {variant === 'settings'
              ? 'Calculator configuration'
              : 'Calculation terms'}
          </h2>
          <p>
            {variant === 'settings'
              ? 'Changes below apply only to the selected configuration.'
              : 'Select the configuration to use for this calculation.'}
          </p>
        </div>
      </div>

      <div className="configuration-actions">
        <label className="configuration-select">
          <span className="sr-only">Calculator configuration</span>
          <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
          >
            {configurations.map((configuration) => (
              <option key={configuration.id} value={configuration.id}>
                {configuration.name}
              </option>
            ))}
          </select>
          <span className="select-arrow" aria-hidden="true">
            <SVG_SelectArrow color="#216DD1" />
          </span>
        </label>
        {onCreated && !formMode && (
          <button
            type="button"
            className="new-configuration-button"
            onClick={() => {
              setName('');
              setFormMode('create');
            }}
          >
            <SVG_Add />
            <span>New configuration</span>
          </button>
        )}
        {value !== 'default' && !formMode && (onRenamed || onDeleted) && (
          <div className="configuration-management-actions">
            {onRenamed && (
              <button
                type="button"
                className="rename-configuration-button"
                onClick={() => {
                  setName(selectedConfiguration?.name || '');
                  setFormMode('rename');
                }}
              >
                Rename
              </button>
            )}
            {onDeleted && (
              <button
                type="button"
                className="delete-configuration-button"
                disabled={isSubmitting}
                onClick={deleteConfiguration}
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {formMode && (
        <form
          className="configuration-create-form"
          onSubmit={
            formMode === 'create' ? createConfiguration : renameConfiguration
          }
        >
          <div className="create-form-copy">
            <strong>
              {formMode === 'create'
                ? 'Create new configuration'
                : 'Rename configuration'}
            </strong>
            <span>
              {formMode === 'create'
                ? `All settings from “${selectedConfiguration?.name || 'Default'}” will be copied.`
                : 'Only the display name will be changed.'}
            </span>
          </div>
          <div className="create-form-controls">
            <input
              ref={inputRef}
              value={name}
              maxLength={80}
              aria-label={
                formMode === 'create'
                  ? 'New configuration name'
                  : 'Configuration name'
              }
              placeholder={
                formMode === 'create'
                  ? 'For example, Black Friday'
                  : 'Configuration name'
              }
              onChange={(event) => setName(event.target.value)}
            />
            <button
              type="button"
              className="cancel-configuration-button"
              disabled={isSubmitting}
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-configuration-button"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting
                ? formMode === 'create' ? 'Creating…' : 'Saving…'
                : formMode === 'create' ? 'Create copy' : 'Save name'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default CalculatorConfigurationPicker;
