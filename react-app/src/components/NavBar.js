
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import Logo from './images/robinhood__logo.png'
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  if (!user) {
    return (
      <div className='header__wrapper'>
        <div className='header__left'>
          <div className='header__name'>Robinhold</div>
          <img className='header__logo' src={Logo} alt='logo' />
        </div>
        <div className='header__right'>
          <NavLink className='header__button' to='/login' exact={true} activeClassName='active'>
            Log in
          </NavLink>
          <NavLink className='header__button' to='/sign-up' exact={true} activeClassName='active'>
            Sign up
          </NavLink>
          <NavLink className='header__button' to='/' exact={true} activeClassName='active'>
            Demo user
          </NavLink>
        </div>
      </div>
    )
  }

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
