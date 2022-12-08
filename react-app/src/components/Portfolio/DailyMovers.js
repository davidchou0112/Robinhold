import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import './DailyMovers.css'

const DailyMovers = () => {
    return (
        <div className='daily_movers_wrapper'>
            <NavLink className='daily_movers_1' id='body__button_0' to='/stocks/11' exact={true} activeClassName='active'>
            </NavLink>
            <NavLink className='daily_movers_2' id='body__button_0' to='/stocks/12' exact={true} activeClassName='active'>
            </NavLink>
            <NavLink className='daily_movers_3' id='body__button_0' to='/stocks/10' exact={true} activeClassName='active'>
            </NavLink>
            <NavLink className='daily_movers_4' id='body__button_0' to='/stocks/9' exact={true} activeClassName='active'>
            </NavLink>
        </div>
    )
}

export default DailyMovers