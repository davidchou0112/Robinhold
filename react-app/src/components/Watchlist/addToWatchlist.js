import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toWatchList } from "../../store/actionWatchlist"
import './addToWatchlist.css'

export default function AddToWatchlist({ watchlistId }) {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    console.log('stockId >> AddToWatchlist >> : ', stockId)
    // const userId = useSelector(state => state.session.user.id)
    // console.log('userId >> AddToWatchlist >> : ', userId)
    // const watchlist = useSelector(state => state.session.user.watchlists[1].watched_stocks)
    const watchlist = useSelector(state => state.watchlist.allWatchlists[watchlistId])
    console.log('watchlist.id >> AddToWatchlist >> : ', watchlist.id)
    console.log('watchlist >> AddToWatchlist >> : ', watchlist)

    const stockToWatchlist = async e => {
        e.preventDefault();
        const updatedWatchlist = {
            watchlistId: watchlist.id,
            stockId: stockId,
        }
        dispatch(toWatchList(stockId, watchlistId, updatedWatchlist))
    }

    return (
        <button className='add_button' onClick={stockToWatchlist} >Add Stock to List</button>
    )
}

