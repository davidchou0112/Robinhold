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
      // console.log(data)
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
    // <div className='signup_body'>

    //   <div id='signup_background'></div>
    //   <div className='login_body'>
    // <form className='justforwhite' onSubmit={onSignUp}>
    //       <div className='error_message'>
    //         {errors.map((error, ind) => (
    //           <div key={ind}>{error}</div>
    //         ))}
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>User Name</label>
    //         <input className='input_field'
    //           type='text'
    //           name='username'
    //           onChange={updateUsername}
    //           value={username}
    //           placeholder='Between 4 and 12 characters'
    //         ></input>
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>First Name</label>
    //         <input className='input_field'
    //           type='text'
    //           name='firstname'
    //           onChange={updateFirstname}
    //           value={firstname}
    //           placeholder='Between 1 and 20 characters'
    //         ></input>
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>Last Name</label>
    //         <input className='input_field'
    //           type='text'
    //           name='lastname'
    //           onChange={updateLastname}
    //           value={lastname}
    //           placeholder='Between 1 and 20 characters'
    //         ></input>
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>Email</label>
    //         <input className='input_field'
    //           type='text'
    //           name='email'
    //           onChange={updateEmail}
    //           value={email}
    //           placeholder='Email'
    //         ></input>
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>Password</label>
    //         <input className='input_field'
    //           type='password'
    //           name='password'
    //           onChange={updatePassword}
    //           value={password}
    //           placeholder='Between 6 and 20 characters'

    //         ></input>
    //       </div>
    //       <div className='justforwhite'>
    //         <label className='bblackfwhite'>Repeat Password</label>
    //         <input className='input_field'
    //           type='password'
    //           name='repeat_password'
    //           onChange={updateRepeatPassword}
    //           value={repeatPassword}
    //           required={true}
    //           placeholder='Repeat Password'
    //         ></input>
    //       </div>
    //       <button className='body__button' id='body__button_3' type='submit'>Sign Up</button>
    //       <div className='no_account'><small className='bblackfwhite'>Already started? <NavLink className='blackblue' to='/login' exact={true}>Log in to complete your application</NavLink></small></div>
    //     </form>
    //   </div>
    // </div>

    <div className='justforwhite1'>
      <div className='login_wrapper'>
        <div id='signup_background'></div>
        <div className='login_body'>
          <form className='login_context' onSubmit={onSignUp}>
            <div className='login_header'><strong className='bblackfwhite' id='auth_label'>Sign up to Robinhold</strong></div>

            <div className='login_form'>
              <div className='error_message'>
                {errors.map((error, ind) => (
                  <div className='error_message' key={ind}>{error}</div>
                ))}
              </div>
              <label className='bblackfwhite' htmlFor='email'>User Name</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                  placeholder='Between 4 and 12 characters'
                />
              </div>
              <label className='bblackfwhite' htmlFor='email'>First Name</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='text'
                  name='firstname'
                  onChange={updateFirstname}
                  value={firstname}
                  placeholder='Between 1 and 20 characters'
                />
              </div>
              <label className='bblackfwhite' htmlFor='email'>Last Name</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='text'
                  name='lastname'
                  onChange={updateLastname}
                  value={lastname}
                  placeholder='Between 1 and 20 characters'
                />
              </div>
              <label className='bblackfwhite' htmlFor='email'>Email</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                  placeholder='Email'
                />
              </div>
              <label className='bblackfwhite' htmlFor='email'>Password</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                  placeholder='Between 6 and 20 characters'
                />
              </div>
              <label className='bblackfwhite' htmlFor='password'>Repeat Password</label>
              <div className='bblackfwhite'>
                <input className='input_field'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                  placeholder='Repeat Password'
                />
              </div>

              <div className='button_field'>
                <button className='body__button' id='body__button_3' type='submit'>Sign Up</button>
              </div>
              <div className='no_account'><small className='bblackfwhite'>Already started? <NavLink className='blackblue' to='/login' exact={true}>Log in to complete your application</NavLink></small></div>
            </div>
          </form>
        </div>
      </div >
      <div className='login_session2'></div>
    </div>


  );
};

export default SignUpForm;
