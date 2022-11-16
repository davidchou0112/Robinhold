import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      // setErrors([]);
      // const data = await dispatch(signUp(username, email, firstname, lastname, password));
      // console.log(data)
      // console.log(data)
      // if (data) {
      //   setErrors(data)
      // }

      setErrors([]);
      const data = await dispatch(signUp(username, email, firstname, lastname, password));
      console.log(data)
      if (data) {
        return setErrors(data)
      }


      // return dispatch(signUp(username, email, firstname, lastname, password))
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     console.log(data)
      //     if (data && data.errors) setErrors(data.errors);
      //   });


    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
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
        <div className='error_message'>
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
            placeholder='betweeen 4 and 12 charaters'
          ></input>
        </div>
        <div>
          <label>First Name</label>
          <input className='input_field'
            type='text'
            name='firstname'
            onChange={updateFirstname}
            value={firstname}
            placeholder='betweeen 1 and 20 charaters'
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input className='input_field'
            type='text'
            name='lastname'
            onChange={updateLastname}
            value={lastname}
            placeholder='betweeen 1 and 20 charaters'
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
            placeholder='betweeen 6 and 20 charaters'

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
        <button className='body__button' id='body__button_3' type='submit'>Sign Up</button>
        <div className='no_account'><small>Already started? <NavLink to='/login' exact={true}>Log in to complete your application</NavLink></small></div>
      </form>
    </div>
  );
};

export default SignUpForm;
