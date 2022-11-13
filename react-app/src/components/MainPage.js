import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavBar.css'


const MainPage = () => {

  const user = useSelector(state => state.session.user);

  if (!user) {
      return (

      <div className='body__wrapper'>
        <div className='body__session1'>
          <h1 id='body__h1'>Run your money</h1>
          <h2 id='body__h2'>Invest with stocks, crypto, and cash</h2>
          <h2 id='body__h2'>on your terms.</h2>
          <NavLink className='body__button' id='body__button_0'to='/sign-up' exact={true} activeClassName='active'>
            Get Started
          </NavLink>
        </div>
        <div className='body__session2'>

        </div>
        <div className='body__session1' id='body__session3'>
          <h1 id='body__h1-1'>Join a new generation</h1>
          <h1 id='body__h1-1'>of investors</h1>

          <NavLink className='body__button' id='body__button_1' to='/sign-up' exact={true} activeClassName='active'>
            Sign up
          </NavLink>
        </div>
      </div>
  )
  }

  return 'this shows the portfolio page when a user is logged in'



}

export default MainPage;
