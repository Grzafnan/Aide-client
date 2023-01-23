import React, { useState } from 'react';
import './Login.css'



const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [checkBox, setCheckBox] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, email, password }

    console.log(user);
  }


  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const user = { email, password }
    console.log(user);
  }


  return (
    <>
      <section className='form-container'>
        <div className={`wrapper ${toggle ? "active" : ''}`}>
          <div className="form signup">
            <div className='button-wrapper'>
              <button onClick={() => setToggle(false)}>Signup</button>
            </div>
            <form onSubmit={handleSignUp}>
              <input name='name' type="text" placeholder="Full name" required />
              <input name='email' type="text" placeholder="Email address" required />
              <input name='password' type="password" placeholder="Password" required />
              <div className="checkbox">
                <input onChange={() => setCheckBox(!checkBox)} type="checkbox" id="signupCheck" />
                <label htmlFor="signupCheck">I accept all terms & conditions</label>
              </div>
              <input type="submit" disabled={!checkBox} value="Signup" />
            </form>
          </div>

          <div className="form login">
            <div className='button-wrapper'>
              <button onClick={() => setToggle(true)}>
                Login
              </button>
            </div>
            <form onSubmit={handleLogin}>
              <input name='email' type="text" placeholder="Email address" required />
              <input name='password' type="password" placeholder="Password" required />
              <a href="/">Forgot password?</a>
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>

      </section>
    </>
  );
};

export default Login;