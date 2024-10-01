import { useEffect, useMemo, useState } from 'react';
import './Users.css';

import {
  createNewUser,
  deleteUser,
  editUser,
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
      name: 'displayName',
      placeholder: 'Jakub Kowalski',
      type: 'text',
      defaultValue: '',
    },
  },
  {
    tagName: 'input',
    fieldConfig: {
      name: 'email',
      placeholder: 'test@gmail.com',
      type: 'email',
      defaultValue: '',
    },
  },
  {
    tagName: 'select',
    fieldConfig: {
      name: 'role',
      defaultValue: 'user',
      selectionOptions: ['user', 'admin'],
    },
  },
];

const fieldsValidateFuncs = {
  displayName: nameValidation,
  email: emailValidation,
  role: (value: string) => true,
};

// const fieldsDefaultValues = {
//   name: '',
//   email: '',
//   role: 'user',
// };

function Users() {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserProfile[]>([]);

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

  useEffect(() => {
    console.log('users: ', users);
  }, [users]);

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
        fieldsValidateFuncs={fieldsValidateFuncs}
        searchBy="displayName"
        searchInputText="name"
        addNewRecordFunc={createNewUser}
        deleteRecordFunc={deleteUser}
        editRecordFunc={editUser}
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
