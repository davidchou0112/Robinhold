import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../images/robinhood__logo.png'
import background01 from '../images/background01.jpeg'
import './NavBarNoLogin.css'


const NavBarNoLogin = () => {
  return (
    <div className='page__wrapper'>
      <div className='header__wrapper'>
        <div className='header__left'>
          <div className='header__name'>Robinhold</div>
          <img className='header__logo' src={Logo} alt='logo' />
        </div>
        <div className='header__right'>
          <NavLink className='header__button' to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
          <NavLink className='header__button' to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
          <NavLink className='header__button' to='/' exact={true} activeClassName='active'>
            Demo
          </NavLink>
        </div>
      </div>
      <div className='body__wrapper'>
        <div className='body__session1'>
          <h1 id='body__h1'>Run your money</h1>
          <h2 id='body__h2'>Invest with stocks, crypto, and cash on your terms.</h2>
          <NavLink className='body__button' to='/sign-up' exact={true} activeClassName='active'>
            Get Started
          </NavLink>
        </div>
        <div className='body__session2'>

        </div>
        <div className='body__session1' id='body__session3'>
          <h1 id='body__h1-1'>Join a new generation of investors</h1>

          <NavLink className='body__button' to='/sign-up' exact={true} activeClassName='active'>
            Sign up
          </NavLink>
        </div>
      </div>

    </div>





    // <nav>
    //   <ul>
    //     <li>
    //       <NavLink to='/' exact={true} activeClassName='active'>
    //         Home
    //       </NavLink>
    //     </li>
    //     <li>
    //
    //     </li>
    //     <li>
    //       <NavLink to='/sign-up' exact={true} activeClassName='active'>
    //         Sign Up
    //       </NavLink>
    //     </li>
    //     <li>
    //       <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink>
    //     </li>

    //   </ul>
    // </nav>
  );
}

export default NavBarNoLogin;
