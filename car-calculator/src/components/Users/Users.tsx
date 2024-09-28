import { useEffect, useState } from 'react';
import './Users.css';

import {
  addAdminRole,
  createNewUser,
  getUsers,
  deleteUser,
} from '../../services/firebase/functions';
import { subscribeOnUserUpdate } from '../../services/firebase/realtimeDb';
import Loader from '../Loader/Loader';
import CustomTable from '../CustomTable/CustomTable';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'user' | 'admin';
  customClaims?: {
    role?: 'user' | 'admin';
  };
}

const fields = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'name',
      placeholder: 'Jakub Kowalski',
      type: 'text',
      defaultValue: '',
      isRequired: false,
      validateFunction: nameValidation,
    },
  },
  {
    tagName: 'input',
    fieldConfig: {
      name: 'email',
      placeholder: 'test@gmail.com',
      type: 'email',
      defaultValue: '',
      isRequired: true,
      validateFunction: emailValidation,
    },
  },
  {
    tagName: 'select',
    fieldConfig: {
      name: 'role',
      isRequired: false,
      defaultValue: 'user',
      selectionOptions: ['user', 'admin'],
      validateFunction: (input: string) => true,
    },
  },
];

function Users() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserProfile[]>([]);


  // вызывает сомнения
  useEffect(() => {
    let unsubscribeFunc: () => void = () => {};

    const subcribe = async () => {
      unsubscribeFunc = await subscribeOnUserUpdate(setUsers);
    };

    subcribe();

    return () => unsubscribeFunc();
  }, []);

  const records = Object.values(users).map((user) => {
    // loadUsers().finally(() => setLoading(false));
    const result: { id: string; rowData: string[] } = { id: '', rowData: [] };

    result.id = user.uid;
    result.rowData = [user.displayName, user.email, user.role];
    return result;
  });

  console.log('records: ', records);
  return (
    <>
      {/* Custom table */}
      <CustomTable
        tableIconPath={'table-logo/users.svg'}
        tableName="Users"
        tableColumnNames={['Name', 'Email', 'Role']}
        tableFields={fields}
        records={records}
        searchBy="name"
        addNewRecordFunc={createNewUser}
        deleteRecordFunc={deleteUser}
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

function formatName(name: string): string {
  const names = name.trim().split(' ');

  const result = names.map((name: string) => {
    const firstLetter = name[0].toUpperCase();
    const otherLetter = name.slice(1).toLocaleLowerCase();

    return firstLetter + otherLetter;
  });

  return result.join(' ');
}

export default Users;
