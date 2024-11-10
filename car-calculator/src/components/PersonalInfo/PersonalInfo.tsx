import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // Подключаем стили

import './PersonalInfo.css';
import { useEffect, useState } from 'react';
import { updateUserName } from '../../services/firebase/auth';
import { useImmer } from 'use-immer';
import { subscribeOnUserUpdate } from '../../services/firebase/realtimeDb';
import { useUserLogIn } from '../../hooks';

type ValidateInput =
  | {
      error: string;
    }
  | boolean;

interface PersonalInfo {
  displayName: string;
  email: string;
  role: 'user' | 'admin';
}

function PersonalInfo() {
  const currentUser = useUserLogIn();

  const [personalInfo, setPersonalInfo] = useImmer({});

  console.log('personalInfo: ', personalInfo);

  useEffect(() => {
    const unsubscribeFunc = subscribeOnUserUpdate(
      currentUser.uid,
      setPersonalInfo,
    );

    return unsubscribeFunc;
  }, []);

  const [nameInit = '', sernameInit = ''] = currentUser.displayName.split(' ');

  const [name, setName] = useState<string>(nameInit);
  const [surname, setSurname] = useState<string>(sernameInit);
  const [phone, setPhone] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSurname(e.target.value);
  const handlePhoneChange = (newNumber: string) => {
    setPhone(newNumber);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValidation = [
      validateName(name),
      validateName(surname),
      validatePhoneNumber(phone),
    ];

    const isFormDataValid = formValidation.every(
      (value) => typeof value === 'boolean' && value,
    );

    if (isFormDataValid) {
      const newName: string = `${formatName(name)} ${formatName(surname)}`;

      updateUserName(newName);
    }
  };

  return (
    <form action="" className="personal-info" onSubmit={handleFormSubmit}>
      <h2>Personal info</h2>
      <div className="group">
        <h3>Personal</h3>
        <p>Your name, e-mail and phone</p>
        <input type="text" placeholder="libertycartrade@gmail.com" disabled />
        <input
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
        <input
          type="text"
          placeholder="Surname"
          onChange={handleSurnameChange}
          value={surname}
        />

        <PhoneInput
          inputClass="phone-input-field"
          buttonClass="phone-input-flag-dropdown"
          containerClass="phone-input-wrapper"
          country={'pl'}
          value="+48 797-400-212"
          onChange={handlePhoneChange}
        />
      </div>

      <button type="submit" className="save-btn">
        Save
      </button>
    </form>
  );
}

function validateName(name: string): ValidateInput {
  if (name.trim().length === 0) return true;

  const regex: RegExp = /^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż\s-]+$/;

  const isValid = regex.test(name);

  if (!isValid) {
    return {
      error: 'The name must contain only letters!',
    };
  }

  return isValid;
}

function validatePhoneNumber(tel: string): ValidateInput {
  if (tel.length === 0) return true;

  const isValid: boolean = tel.length >= 10 && tel.length <= 15;

  return isValid;
}

function formatName(name: string) {
  const firstLetter = name[0].toUpperCase();
  const otherLetter = name.slice(1).toLocaleLowerCase();

  return firstLetter + otherLetter;
}

export default PersonalInfo;
