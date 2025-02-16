import './ManualCalculation.css';

interface SubSectionProps {
  title: string;
  currency: 'USD' | 'EUR' | 'PLN';
}

function ManualCalculation() {
  return (
    <section className="manual-calculation">
      <div className="container">
        <header>
          <h5>Manual calculation</h5>
        </header>
        <form>
          <div className="row">
            <label htmlFor="vehiclePrice">Cena pojazdu</label>
            <div className="input-wrapper">
              <input
                type="number"
                id="vehiclePrice"
                name="vehiclePrice"
                placeholder="0"
              />
              <span className="currency">USD</span>
            </div>
          </div>
          <div className="row">
            <label htmlFor="location">Lokalizacja</label>
            <div className="input-wrapper">
              <select
                id="location"
                name="location"
                // placeholder=" Select location"
              >
                <option value="" selected>
                  Select location
                </option>
                <option value="warsaw">Warszawa</option>
                <option value="krakow">Kraków</option>
                <option value="gdansk">Gdańsk</option>
              </select>
              <span className="arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M12.6666 5.66699L7.99992 10.3337L3.33325 5.66699"
                    stroke="#7C8DB5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="row additional">
            <p>Additionally</p>
            <div className="selects">
              <div className="select-wrap">
                <label htmlFor="clo">CLO</label>
                <div className="select">
                  <select id="clo" name="clo">
                    <option value="0">0%</option>
                    <option value="1.7">1.7%</option>
                    <option value="6">6%</option>
                  </select>
                  <span className="arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.6666 5.66699L7.99992 10.3337L3.33325 5.66699"
                        stroke="#7C8DB5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="select-wrap">
                <label htmlFor="vat">Vat</label>
                <div className="select">
                  <select id="vat" name="vat">
                    <option value="19">19%</option>
                    <option value="21">21%</option>
                    <option value="23">23%</option>
                  </select>
                  <span className="arrow">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M12.6666 5.66699L7.99992 10.3337L3.33325 5.66699"
                        stroke="#7C8DB5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-wrapper">
            <button className="save-jpg">Save JPG</button>
            <button className="calculate">OK</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ManualCalculation;
