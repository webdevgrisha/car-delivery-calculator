import { useState } from 'react';
import './LoginForm.css';

import { signInUser } from '../../services/firebase/auth';
import { useAuth } from '../../utils/AuthProvider';
import { Navigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { currentUser } = useAuth();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signInUser(email, password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <main className="login-page">
      <form onSubmit={handleSubmitForm} className="login-form">
        <header>
          <img src="./logo-black.png" alt="logo" />
          <h1>Log In</h1>
        </header>
        <div className="row">
          <label>E-mail</label>
          <input
            onChange={handleEmailChange}
            type="email"
            placeholder="Enter email"
            required
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Enter password"
            required
          />
        </div>
        <button>Login</button>
      </form>
    </main>
  );
}

export default LoginForm;
