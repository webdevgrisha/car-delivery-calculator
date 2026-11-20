import { useState } from 'react';
import classNames from 'classnames';
import { SVG_SelectArrow } from '../../../assets';
import {
  CalculationSection,
  RowData,
  SelectedOptionalRows,
} from '../interfaces';
import './OptionalFields.css';

interface OptionalFieldsProps {
  rowsBySection: Record<CalculationSection, RowData[]>;
  selectedRows: SelectedOptionalRows;
  onToggle: (section: CalculationSection, rowId: string) => void;
}

const sectionLabels: Record<CalculationSection, string> = {
  auction_and_shipping: 'Aukcja i wysyłka',
  customs_clearance: 'Odprawa celna',
  other_payments: 'Inne płatności (netto)',
};

const sectionOrder = Object.keys(sectionLabels) as CalculationSection[];

function OptionalFields({
  rowsBySection,
  selectedRows,
  onToggle,
}: OptionalFieldsProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const groups = sectionOrder
    .map((section) => ({
      section,
      rows: rowsBySection[section].filter(
        (row): row is RowData & { id: string } =>
          Boolean(row.isOptional && row.id),
      ),
    }))
    .filter(({ rows }) => rows.length > 0);

  if (groups.length === 0) return null;

  return (
    <section className="optional-fields">
      <div className="container">
        <header className={classNames({ underline: isExpanded })}>
          <h3>Koszty opcjonalne</h3>
          <button
            type="button"
            className={classNames('arrow', { rotate: isExpanded })}
            onClick={() => setIsExpanded((current) => !current)}
            aria-expanded={isExpanded}
            aria-label="Pokaż lub ukryj koszty opcjonalne"
          >
            <SVG_SelectArrow color="#216DD1" />
          </button>
        </header>

        <div className={classNames('optional-fields-groups', { show: isExpanded })}>
          {groups.map(({ section, rows }) => (
            <div className="optional-fields-group" key={section}>
              <p className="group-title">{sectionLabels[section]}</p>
              {rows.map(({ id, rowName, currency }) => {
                const isSelected = selectedRows[section].includes(id);
                return (
                  <label
                    className={classNames('optional-field', {
                      selected: isSelected,
                    })}
                    key={id}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(section, id)}
                    />
                    <span>{rowName}</span>
                    <span className="currency">{currency}</span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OptionalFields;
