import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './auth.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {

    await dispatch(logout());
    // history.push('/')
    // Redirect('/')
  };

  return (
    <div>

      <button className='header__button' onClick={onLogout}>
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        Logout
        </button>
    </div>

  );
};

export default LogoutButton;
