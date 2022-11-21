import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toWatchList, getAllWatchlists } from "../../store/watchlists"
import './addToWatchlist.css'

export default function AddToWatchlist({ watchlistId }) {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    // console.log('stockId >> AddToWatchlist >> : ', stockId)
    const userId = useSelector(state => state.session.user.id)
        dispatch(getAllWatchlists(userId))

    const stockToWatchlist = async e => {
        e.preventDefault();
        const updatedWatchlist = {
            watchlist_id: watchlist.id,
            stock_id: stockId,
        }
        await dispatch(toWatchList(stockId, watchlistId, updatedWatchlist))
        await dispatch(getAllWatchlists(userId))
    }

    return (
        <button className='add_button' onClick={stockToWatchlist} >Add Stock to List</button>
    )
}
