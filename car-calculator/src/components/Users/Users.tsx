import { useEffect, useState } from 'react';
import './Users.css';
import { useImmer } from 'use-immer';

import {
  addAdminRole,
  createNewUser,
  getUsers,
} from '../../services/firebase/auth';
import Loader from '../Loader/Loader';
import CustomTable from '../CustomTable/CustomTable';

type UserFileds = 'name' | 'email' | 'role';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: 'user' | 'admin';
  customClaims?: {
    role?: 'user' | 'admin';
  };
}

interface NewUserData {
  name: string;
  email: string;
  role: string;
}

function Users() {
  const [showAddUserFields, setShowAddUserFields] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<UserProfile[]>([]);

  function loadUsers() {
    return getUsers().then((result) => {
      console.log('useEffect:', result);
      const usersProfile = result.data.users.map((userRecord) => {
        const { uid, displayName, email, customClaims }: UserProfile =
          userRecord;
        const userProfile: UserProfile = {
          uid,
          displayName,
          email,
          role: customClaims?.role || 'user',
        };

        return userProfile;
      });
      console.log('users profile: ', usersProfile);
      setUsers(usersProfile);
    });
  }

  useEffect(() => {
    loadUsers().finally(() => setLoading(false));
  }, []);

  const handleShowNewUserFields = () => setShowAddUserFields(true);

  //  const
  // const usersTableConfig = {};
  const fields = [
    {
      tagName: 'input',
      fieldConfig: {
        name: 'name',
        placeholder: 'Jakub Kowalski',
        type: 'text',
        defaultValue: '',
        isRequired: false,
        validateFunction: (input: string) => true,
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

  return (
    <section className="users">
      <header>
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#216DD1"
            viewBox="0 0 1024 1024"
          >
            <circle cx="435.2" cy="409.5" r="102.4" />
            <path d="M588.8 409.5c0 17.6-3.1 34.5-8.6 50.3 2.9.2 5.7.9 8.6.9 56.6 0 102.4-45.8 102.4-102.4 0-56.6-45.8-102.4-102.4-102.4-26.1 0-49.7 10.1-67.8 26.2 40.9 27.7 67.8 74.4 67.8 127.4zM435.2 563.1c-128 0-179.2 25.6-179.2 102.4v102.6h358.4V665.5c0-77.3-51.2-102.4-179.2-102.4z" />
            <path d="M588.8 511.9c-14.5 0-27.9.4-40.5 1.1-2.3 2.5-4.6 4.9-7 7.2 63.7 13.5 124.2 49.5 124.2 145.3v51.4H768V614.3c0-77.3-51.2-102.4-179.2-102.4z" />
          </svg>
        </div>
        <h2>Users</h2>
        <button onClick={handleShowNewUserFields}>Add New</button>
      </header>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {loading && <Loader />}
          {showAddUserFields && <AddNewUser />}
          <CreateRows users={users} />
        </tbody>
      </table>

      {/* Custom table */}
      <CustomTable
        tableIconPath={'table-logo/users.svg'}
        tableName="Users"
        tableColumnNames={['Name', 'Email', 'Role']}
        tableFields={fields}
      />
    </section>
  );
}

function AddNewUser() {
  const [newUserData, setNewUserData] = useImmer<NewUserData>({
    name: '',
    email: '',
    role: 'user',
  });
  const [emailError, setEmailError] = useState<boolean>(false);

  const handleSetNewUserData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const property = e.target.getAttribute('name') as UserFileds;

    if (property === null) throw Error('input must have name attribute!');
    if (!['name', 'email', 'role'].includes(property))
      throw Error('Unknow name attribute value');

    setEmailError(false);

    setNewUserData((draft) => {
      draft[property] = value;
    });
  };

  const handleAddNewUser = () => {
    console.log(newUserData);
    const { name, email, role }: NewUserData = newUserData;
    const isEmailValid = emailValidation(email);
    console.log(isEmailValid);
    if (!isEmailValid) {
      setEmailError(true);
      return;
    }

    const formatedName: string = formatName(name);

    createNewUser({ email, name, role });
  };

  const emailInputClass = emailError ? 'error' : '';

  return (
    <tr className="add-new-user" key="0">
      <td>
        <input
          type="text"
          name="name"
          placeholder="Jakub Kowalski"
          onChange={handleSetNewUserData}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          placeholder="test@gmail.com"
          className={emailInputClass}
          required
          onChange={handleSetNewUserData}
        />
      </td>
      <td>
        <select name="role" id="" onChange={handleSetNewUserData}>
          <option value="user" selected>
            user
          </option>
          <option value="admin">admin</option>
        </select>
        <div className="buttons">
          <button className="edit-btn btn" onClick={handleAddNewUser}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                width="23.5"
                height="23.5"
                x="0.25"
                y="0.25"
                fill="#E3EAFF"
                stroke="#DFE7F0"
                stroke-width="0.5"
                rx="4.75"
              ></rect>
              <path
                fill="#216DD1"
                d="M12.461 6.462a.462.462 0 1 0-.922 0v5.077H6.462a.462.462 0 1 0 0 .922h5.077v5.077a.461.461 0 1 0 .922 0v-5.077h5.077a.461.461 0 1 0 0-.922h-5.077V6.462Z"
              ></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

interface CreateRowsProps {
  users: UserProfile[];
}

function CreateRows({ users }: CreateRowsProps) {
  const [editRowId, seteditRowId] = useState<string>('');

  const handleEditRow = (rowId: string) => seteditRowId(rowId);
  const closeAndRevertChange = () => seteditRowId('');

  return users.map((userData: UserProfile) => {
    const { uid, displayName, email, role } = userData;
    return (
      <tr key={uid}>
        <td>
          <p>{displayName}</p>
        </td>
        <td>
          <p>{email}</p>
        </td>
        <td>
          <p>{role}</p>
          <div className="buttons">
            {editRowId !== uid && (
              <>
                <button
                  className="edit-btn btn"
                  onClick={() => handleEditRow(uid)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      width="23.5"
                      height="23.5"
                      x="0.25"
                      y="0.25"
                      stroke="#DFE7F0"
                      stroke-width="0.5"
                      rx="4.75"
                    ></rect>
                    <path
                      fill="#216DD1"
                      fill-rule="evenodd"
                      d="m7.315 13.119 5.653-5.541a1.89 1.89 0 0 1 2.634 0l.755.74a1.8 1.8 0 0 1 0 2.582l-5.675 5.563a1.748 1.748 0 0 1-1.224.497H7.134a.38.38 0 0 1-.384-.386l.059-2.3c.011-.434.193-.848.506-1.155Zm8.499-4.269-.755-.74a1.11 1.11 0 0 0-1.548 0l-.439.43 2.303 2.257.439-.43a1.058 1.058 0 0 0 0-1.517Zm-7.956 4.801 4.671-4.578 2.303 2.257-4.693 4.6-.063.056a.974.974 0 0 1-.618.22h-1.93l.049-1.912a.936.936 0 0 1 .281-.643Zm9.392 2.932a.38.38 0 0 0-.384-.377h-4.008l-.052.004a.38.38 0 0 0-.332.373.38.38 0 0 0 .384.377h4.008l.052-.004a.38.38 0 0 0 .332-.373Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button className="delete-btn btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 7H20"
                      stroke="#FF4242"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                      stroke="#FF4242"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#FF4242"
                      stroke-width="1"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <rect
                      width="23.5"
                      height="23.5"
                      x="0.25"
                      y="0.25"
                      stroke="#FF4242"
                      stroke-width="0.5"
                      rx="4.75"
                    ></rect>
                  </svg>
                </button>
              </>
            )}
            {editRowId === uid && (
              <>
                <button className="save-btn btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      width="23.5"
                      height="23.5"
                      x="0.25"
                      y="0.25"
                      stroke="#249E3F"
                      stroke-width="0.5"
                      rx="4.75"
                    ></rect>
                    <path
                      fill="#249E3F"
                      fill-rule="evenodd"
                      d="M18.134 7.031c-.056.022-.107.04-.114.04-.006 0-1.791 1.866-3.966 4.146l-3.953 4.144-1.526-1.602c-1.673-1.757-1.641-1.729-1.935-1.73a.66.66 0 0 0-.622.488.906.906 0 0 0 .04.501c.057.117 3.633 3.868 3.75 3.933.065.035.145.049.293.049.176 0 .219-.01.318-.071.144-.09 8.468-8.822 8.532-8.95.064-.129.066-.485.002-.607a.913.913 0 0 0-.304-.317c-.114-.061-.387-.074-.515-.024Z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button
                  className="cancel-btn btn"
                  onClick={closeAndRevertChange}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fill="#FF4242"
                      d="M16.846 7.9a.527.527 0 1 0-.746-.746l-4.1 4.1-4.1-4.1a.527.527 0 0 0-.746.746l4.1 4.1-4.1 4.1a.527.527 0 0 0 .746.746l4.1-4.1 4.1 4.1a.527.527 0 1 0 .746-.746l-4.1-4.1 4.1-4.1Z"
                    ></path>
                    <rect
                      width="23.5"
                      height="23.5"
                      x="0.25"
                      y="0.25"
                      stroke="#FF4242"
                      stroke-width="0.5"
                      rx="4.75"
                    ></rect>
                  </svg>
                </button>
              </>
            )}
          </div>
        </td>
      </tr>
    );
  });
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
