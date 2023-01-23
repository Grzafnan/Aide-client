import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider/Authprovider';


const Login = () => {
  const [toggle, setToggle] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const { createUser, signInWithEmail, updateUserProfile, setLoading } = useContext(AuthContext)


  const location = useLocation();
  const navigate = useNavigate();


  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user = { name, email, password }


    createUser(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const currentUser = {
          email: user.email
        };
        update(name);
        savedUserDB(name, email, 'user')
        // jwtVerify(currentUser)
        navigate('/');
        toast.success('Register Success', { autoClose: 500 })
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
        toast.error(errorMessage, { autoClose: 500 });
        // ..
      })
  }

  const update = (name) => {
    updateUserProfile(name)
      .then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  }


  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInWithEmail(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // console.log(user);
        // setLoginUserEmail(data.email)
        form.reset();
        navigate('/');
        toast.success('Login successful');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        toast.error(errorMessage)
      })
      .finally(() => {
        setLoading(false)
      })
  }




  const savedUserDB = (name, email, role) => {
    const user = {
      name,
      email,
      role,
    }

    axios.post(`${process.env.REACT_APP_API_URL}/users`, user)
      .then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      })
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