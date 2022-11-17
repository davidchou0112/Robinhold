import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './DailyMovers.css'

const DailyMovers = () => {
    return (
        <div className='daily_movers_wrapper'>
            <div className='daily_movers_1'></div>
            <div className='daily_movers_2'></div>
            <div className='daily_movers_3'></div>
            <div className='daily_movers_4'></div>
        </div>
    )
}

export default DailyMovers