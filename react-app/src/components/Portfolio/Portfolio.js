import './Portfolio.css'
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


const Portfolio = () => {

  // return 'this shows the portfolio page when a user is logged in'
  return (
    <div className='port_wrapper'>

      <div className='port_left'>
        <div>
          Total investment money chart section
        </div>
        <div>
          buying power section
        </div>
      </div>

      <div className='port_left'>
        <div>
          stocks holding section


        </div>
        <div>
          watchlists section
        </div>
      </div>
    </div>
  )


}

export default Portfolio;
