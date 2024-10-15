import { NavLink } from 'react-router-dom';
import { SVG_Reload, SVG_Search, SVG_Settings } from '../../../assets';
import './AutoCalculation.css';

function AutoCalculation() {
  return (
    <section className="auto-calculation">
      <div className="container">
        <header>
          <h5>Automatic calculation</h5>
          <span>
            <SVG_Reload />
          </span>
          <NavLink to="/settings/calculator">
            <SVG_Settings />
          </NavLink>
        </header>
        <form>
          <input placeholder="http://www.copart.com/lot/3278..." />
          <button>
            <span>
              <SVG_Search />
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default AutoCalculation;
