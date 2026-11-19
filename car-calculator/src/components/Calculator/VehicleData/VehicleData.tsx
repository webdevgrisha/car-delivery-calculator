import {
  SVG_Odometer,
  SVG_FuelType,
  SVG_Keys,
  SVG_Location,
  SVG_PrimaryDamage,
  SVG_Transmission,
  SVG_Engine,
  SVG_Hash,
} from '../../../assets';
import './VehicleData.css';

interface CarDataProps {
  title: string;
  imgs: string[];
  stock: string;
  odometer: string;
  engine: string;
  fuelType: string;
  primaryDamage: string;
  transmission: string;
  keys: string;
  location: string;
}

function VehicleData({
  title,
  imgs,
  stock,
  odometer,
  engine,
  fuelType,
  primaryDamage,
  transmission,
  keys,
  location,
}: CarDataProps) {
  return (
    <section className="vehicle-data">
      <div className="container">
        <header>
          <h4 className="title">{title}</h4>
        </header>
        <div className="info">
          <div className="images">
            {imgs.map((src: string, index: number) => {
              return (
                <div className="wrap">
                  <img src={src} alt="transport photo" key={index}></img>
                </div>
              );
            })}
          </div>
          <h5>Information</h5>
          <div className="details">
            <RenderRow svg={<SVG_Hash />} value={stock} />
            <RenderRow svg={<SVG_Odometer />} value={odometer} />
            <RenderRow svg={<SVG_Engine />} value={engine} />
            <RenderRow svg={<SVG_FuelType />} value={fuelType} />
            <RenderRow svg={<SVG_PrimaryDamage />} value={primaryDamage} />
            <RenderRow svg={<SVG_Transmission />} value={transmission} />
            <RenderRow svg={<SVG_Keys />} value={keys} />
            <RenderRow svg={<SVG_Location />} value={location} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface RenderRowProps {
  svg: React.ReactNode;
  value: string;
}

function RenderRow({ svg, value }: RenderRowProps) {
  return (
    <div className="row">
      <span>{svg}</span>
      <p>{value || '-'}</p>
    </div>
  );
}

export default VehicleData;
