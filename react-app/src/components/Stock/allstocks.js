import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getAllStocks } from '../../store/stocks'
const AllStocks = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const allStocks = useSelector(state => state.stocks.allStocks)

    useEffect(() => {
        dispatch(getAllStocks())
    }, [])


    return (
        <h1>all stocks here</h1>
    )
}


export default AllStocks
