import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Подключаем стили

import './PersonalInfo.css';
import { useState } from 'react';

function PersonalInfo() {
  const [phone, setPhone] = useState('');

  return (
    <form action="" className="personal-info">
      {/* <header> */}
      <h2>Personal info</h2>
      {/* </header> */}
      <div className="group">
        <h3>Personal</h3>
        <p>Your name, e-mail and phone</p>
        <input type="text" placeholder="libertycartrade@gmail.com" disabled />
        <input type="text" placeholder="Name" />
        {/* <input type="text" placeholder="" /> */}

        <PhoneInput
          inputClass="phone-input-field"
          buttonClass="phone-input-flag-dropdown"
          containerClass="phone-input-wrapper"
          country={'pl'}
          value="+48 797-400-212"
          onChange={(phone) => console.log(phone)}
        />
      </div>

      <button className='save-btn'>Save</button>
    </form>
  );
}

export default PersonalInfo;
