import { useEffect, useState } from 'react';
import './Users.css';

import {
  createNewUser,
  deleteUser,
  editUser,
} from '../../services/firebase/functions';
import { subscribeOnUserUpdate } from '../../services/firebase/realtimeDb';
import Loader from '../Loader/Loader';
import { SVG_User } from '../../assets';
import { UserTable } from './UserTable/index';
import { FieldInfo } from './UserTable/types';
import { TableRecord } from './UserTable/interfaces';

interface UserProfile {
  uid: string;
  userData: {
    displayName: string;
    email: string;
    role: 'user' | 'admin';
    customClaims?: {
      role?: 'user' | 'admin';
    };
  };
}

const fields: FieldInfo[] = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'displayName',
      placeholder: 'Jakub Kowalski',
      type: 'text',
      defaultValue: '',
      validate: nameValidation,
    },
  },
  {
    tagName: 'input',
    fieldConfig: {
      name: 'email',
      placeholder: 'test@gmail.com',
      type: 'email',
      defaultValue: '',
      validate: emailValidation,
    },
  },
  {
    tagName: 'select',
    fieldConfig: {
      name: 'role',
      defaultValue: 'user',
      selectionOptions: ['user', 'admin'],
      validate: (value: string) => true,
    },
  },
];

function Users() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<TableRecord[]>([]);

  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void | undefined;

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnUserUpdate(setUsers);
    };

    subcribe();

    return () => {
      if (unsubscribeFunc) unsubscribeFunc();
    };
  }, []);

  console.log('users: ', users);

  return (
    <>
      <UserTable
        tableIcon={<SVG_User />}
        tableName="Users"
        tableColumnNames={['Name', 'Email', 'Role']}
        tableFields={fields}
        records={users}
        searchBy="displayName"
        searchInputText="name"
        addNewUserFunc={createNewUser}
        deleteUserFunc={deleteUser}
        editUserFunc={editUser}
      />
    </>
  );
}

function nameValidation(name: string) {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/;

  if (!name.length) return true;

  const clearName: string = name.trim();

  if (
    clearName.length >= 2 &&
    clearName.length <= 50 &&
    nameRegex.test(clearName)
  ) {
    return true;
  }

  return false;
}

function emailValidation(email: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export default Users;
