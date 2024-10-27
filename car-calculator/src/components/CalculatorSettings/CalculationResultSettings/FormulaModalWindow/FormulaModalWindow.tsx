import classNames from 'classnames';
import './FormulaModalWindow.css';
import { useEffect, useState } from 'react';
import { MentionsInput, Mention } from 'react-mentions';

import mentionStyle from './MentionStyle';
import { tableMention, variableMention } from './mentionData';
import isFormulaValid from './formulaValidation';

interface FormulaModalWindowProps {
  isShown: boolean;
  rowFormula: string;
  setRowFormula: (value: string) => void;
  closeFunc: () => void;
}

function FormulaModalWindow({
  isShown = false,
  rowFormula = '',
  setRowFormula,
  closeFunc,
}: FormulaModalWindowProps) {
  const [formula, setFormula] = useState<string>(rowFormula);
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  useEffect(() => setFormula(rowFormula), [rowFormula, setRowFormula]);

  const modalOverlayClasses = classNames({
    'modal-overlay': true,
    hide: !isShown,
  });

  const formulaModalWindowClasses = classNames({
    'formula-modal-window': true,
    hide: !isShown,
    error: invalidInput,
  });

  const handleInputChange = (value: string) => {
    if (invalidInput) setInvalidInput(false);

    setFormula(value)
  };

  const handleFormulaSave = () => {
    console.log('save: ', formula);
    const isValid: boolean = isFormulaValid(formula);

    setInvalidInput(!isValid);

    if (isValid) setRowFormula(formula);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'Enter',
      'Escape',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];

    const isKeyEnable =
      allowedKeys.includes(event.key) || /[\d\s#$*+/\-)(]/.test(event.key);

    if (!isKeyEnable) {
      event.preventDefault();
    }
  };

  return (
    <div className={modalOverlayClasses}>
      <section className={formulaModalWindowClasses}>
        <div className="container">
          <header>
            <h3>Formula</h3>
            <button className="close-btn" onClick={closeFunc}></button>
          </header>
          <div className="content">
            <MentionsInput
              value={formula}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              singleLine={true}
              style={mentionStyle}
              placeholder="( #repairCosts * 100 ) / 200"
            >
              <Mention
                trigger="$"
                data={tableMention}
                markup="@[__display__]"
              />
              <Mention
                trigger="#"
                data={variableMention}
                markup="@[__display__]"
              />
            </MentionsInput>
            <button className="btn save" onClick={handleFormulaSave}>
              Save
            </button>
          </div>
          <footer>
            <div className="col">
              <h4>Tables</h4>
              <ul>
                {tableMention.map((table, index) => {
                  return (
                    <li key={index}>
                      <p>{table.display}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col">
              <h4>Variables</h4>
              <ul>
                {variableMention.map((table, index) => {
                  return (
                    <li key={index}>
                      <p>{table.display}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default FormulaModalWindow;
