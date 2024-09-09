import './LoginForm.css';

function LoginForm() {
  return (
    <form action="" className="login-form">
      <header>
        <img src="./logo-black.png" alt="logo" />
        <h1>Log In</h1>
      </header>
      <div className="row">
        <label>E-mail</label>
        <input type="email" placeholder="Enter email" />
      </div>
      <div className="row">
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
      </div>
      <button>Login</button>
    </form>
  );
}

export default LoginForm;
