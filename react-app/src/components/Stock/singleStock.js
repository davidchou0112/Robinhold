import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSingleStock } from '../../store/stocks';
import Stock from './Stock'

const SingleStock = () => {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    // console.log('this is stockId__:', stockId)

    const singleStock = useSelector(state => state.stocks.singleStock)
    // console.log('this is state__:', useSelector(state => state))
    // console.log('this is singleStock__:', singleStock)

    useEffect(() => {
        dispatch(getSingleStock(stockId))
    }, [])

    return (
        <div>
            <h3>{singleStock.name}</h3>
            <h2>${singleStock.price}</h2>
            <Stock />
            <p>{singleStock.description}</p>
        </div>

    )
}

export default SingleStock