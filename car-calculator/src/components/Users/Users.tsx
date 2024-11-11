import { useEffect, useState } from 'react';
import './Users.css';

import {
  createNewUser,
  deleteUser,
  editUser,
} from '../../services/firebase/functions';
import { subscribeOnUsersUpdate } from '../../services/firebase/realtimeDb';
import { SVG_User } from '../../assets';
import { UserTable } from './UserTable/index';
import { FieldInfo } from './UserTable/types';
import { UserRecord } from './UserTable/interfaces';

// interface UserProfile {
//   uid: string;
//   userData: {
//     displayName: string;
//     email: string;
//     role: 'user' | 'admin';
//     customClaims?: {
//       role?: 'user' | 'admin';
//     };
//   };
// }

const fields: FieldInfo[] = [
  {
    tagName: 'input',
    fieldConfig: {
      name: 'displayName',
      placeholder: 'Jakub Kowalski',
      type: 'text',
      validate: nameValidation,
    },
  },
  {
    tagName: 'input',
    fieldConfig: {
      name: 'email',
      placeholder: 'test@gmail.com',
      type: 'email',
      validate: emailValidation,
    },
  },
  {
    tagName: 'select',
    fieldConfig: {
      name: 'role',
      defaultValue: 'user',
      selectionOptions: ['Select user role', 'user', 'admin'],
      validate: (value) => value === 'user' || value === 'admin',
    },
  },
];

function Users() {
  const [users, setUsers] = useState<UserRecord[]>([]);

  useEffect(() => {
    const unsubscribeFunc = subscribeOnUsersUpdate(setUsers);

    return unsubscribeFunc;
  }, []);

  console.log('users: ', users);

  return (
    <div className="users">
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
    </div>
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
