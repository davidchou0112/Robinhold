import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup_body'>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input className='input_field'
            type='text'
            name='username'
            onChange={updateUsername}
            value={username}
            placeholder='Username'
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input className='input_field'
            type='text'
            name='email'
            onChange={updateEmail}
            value={email}
            placeholder='Email'
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input className='input_field'
            type='password'
            name='password'
            onChange={updatePassword}
            value={password}
            placeholder='Password'

          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input className='input_field'
            type='password'
            name='repeat_password'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            placeholder='Repeat Password'
          ></input>
        </div>
        <button className='button' type='submit'>Sign Up</button>
        <div className='no_account'><small>Already started? <NavLink to='/login' exact={true}>Log in to complete your application</NavLink></small></div>
      </form>
    </div>
  );
};

export default SignUpForm;
