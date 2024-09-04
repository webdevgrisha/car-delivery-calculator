import './SubSection.css';

interface SubSectionProps {
  title: string;
  rows: string[];
  currency: 'USD' | 'EUR' | 'PLN';
}

function SubSection(props: SubSectionProps) {
  const { title, rows, currency } = props;
  return (
    <div className="sub-section">
      <h3>{title}</h3>

      {rows.map((name: string, index: number) => {
        const rowClass: string = (index === rows.length - 1 ? 'last' : '') + ' row';

        return (
          <div className={rowClass} key={index}>
            <p className="name">{name}</p>
            <p className="price">0 {currency}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SubSection;
