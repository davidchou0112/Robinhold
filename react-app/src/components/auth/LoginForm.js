import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { NavLink } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import './auth.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credential, setCredential] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const demoUserButton = (e) => {
    setEmail('demo@aa.io');
    setPassword('password');
  }

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='justforwhite1'>
      <div className='login_wrapper'>
        <div id='login_background'></div>
        <div className='login_body'>
          <form onSubmit={onLogin} className='login_context'>
            <div className='login_form'>
              <div className='login_header'><strong className='bblackfwhite' id='auth_label'>Log in to Robinhold</strong></div>
              <div className='error_message'>
                {errors.map((error, ind) => (
                  <div className='error_message' key={ind}>{error}</div>
                ))}
              </div>
              <label className='bblackfwhite' htmlFor='email'>Email</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <label className='bblackfwhite' htmlFor='password'>Password</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
                <small className='bblackfwhite'>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
                  <i class="far fa-eye" id="togglePassword"></i>
                  <input type='checkbox' /> Keep me logged in for up to 30 days
                </small>
              </div>

              <div className='button_field'>
                <button className='body__button' id='body__button_3' type='submit'>Login</button>
                <button className='body__button' id='body__button_3' type='submit' onClick={demoUserButton}>Demo User</button>
              </div>
              <div className='no_account'><small className='bblackfwhite'>Not on Robinhold? <NavLink className='blackblue' to='/sign-up' exact={true}>Create an account</NavLink></small></div>
            </div>
          </form>
        </div>
      </div >
    </div>


  );
};

export default LoginForm;
