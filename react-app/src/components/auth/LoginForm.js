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
    setCredential('demo@aa.io');
    setPassword('password');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.message) setErrors(Object.values(data.message));
      }
    );
  };



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
    <div className='login_wrapper'>
      <div id='login_background'></div>
      <div className='login_body'>
        <form onSubmit={onLogin} className='login_context'>
          <div className='login_form'>
            <div className='login_header'><strong>Log in to Robinhold</strong></div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <label htmlFor='email'>Email</label>
            <div>
              <input className='input_field'
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <label htmlFor='password'>Password</label>
            <div>
              <input className='input_field'
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <small>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />
                <i class="far fa-eye" id="togglePassword"></i>
                <input type='checkbox' /> Keep me logged in for up to 30 days
              </small>
            </div>

            <div className='button_field'>
              <button className='button' type='submit'>Login</button>
              <button className='button' type='submit' onClick={demoUserButton}>Demo User</button>
            </div>
            <div className='no_account'><small>Not on Robinhold? <NavLink to='/sign-up' exact={true}>Create an account</NavLink></small></div>
          </div>

        </form>
      </div>
    </div >

  );
};

export default LoginForm;
