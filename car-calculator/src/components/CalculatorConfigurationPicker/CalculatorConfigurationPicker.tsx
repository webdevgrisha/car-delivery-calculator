import { FormEvent, useEffect, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';
import { createCalculatorConfiguration } from '../../services/firebase/functions';
import { CalculatorConfiguration } from '../../services/calculatorConfigurations';
import { showUpdateToast } from '../CustomTable/tableToast';
import { SVG_Add, SVG_SelectArrow, SVG_Settings } from '../../assets';
import './CalculatorConfigurationPicker.css';

interface Props {
  configurations: CalculatorConfiguration[];
  value: string;
  onChange: (id: string) => void;
  onCreated?: (configuration: CalculatorConfiguration) => void;
  variant?: 'calculator' | 'settings';
}

function CalculatorConfigurationPicker({
  configurations,
  value,
  onChange,
  onCreated,
  variant = 'calculator',
}: Props) {
  const [name, setName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedConfiguration = configurations.find(
    (configuration) => configuration.id === value,
  );

  useEffect(() => {
    if (showCreateForm) inputRef.current?.focus();
  }, [showCreateForm]);

  const createConfiguration = (event: FormEvent) => {
    event.preventDefault();
    const configurationName = name.trim();
    if (!configurationName || !onCreated || isSubmitting) return;

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
        setName('');
        setShowCreateForm(false);
        setIsSubmitting(false);
        showUpdateToast(toastId, 'Configuration created', 'success');
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
        {onCreated && !showCreateForm && (
          <button
            type="button"
            className="new-configuration-button"
            onClick={() => setShowCreateForm(true)}
          >
            <SVG_Add />
            <span>New configuration</span>
          </button>
        )}
      </div>

      {onCreated && showCreateForm && (
        <form
          className="configuration-create-form"
          onSubmit={createConfiguration}
        >
          <div className="create-form-copy">
            <strong>Create new configuration</strong>
            <span>
              All settings from “{selectedConfiguration?.name || 'Default'}”
              will be copied.
            </span>
          </div>
          <div className="create-form-controls">
            <input
              ref={inputRef}
              value={name}
              maxLength={80}
              aria-label="New configuration name"
              placeholder="For example, Black Friday"
              onChange={(event) => setName(event.target.value)}
            />
            <button
              type="button"
              className="cancel-configuration-button"
              disabled={isSubmitting}
              onClick={() => {
                setName('');
                setShowCreateForm(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="create-configuration-button"
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting ? 'Creating…' : 'Create copy'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default CalculatorConfigurationPicker;
