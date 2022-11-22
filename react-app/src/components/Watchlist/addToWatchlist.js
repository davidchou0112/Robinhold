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
    // console.log('userId >> AddToWatchlist >> : ', userId)
    // const watchlist = useSelector(state => state.session.user.watchlists[1].watched_stocks)
    const watchlist = useSelector(state => state.watchlist.allWatchlists[watchlistId])
    // console.log('watchlist.id >> AddToWatchlist >> : ', watchlist.id)
    // console.log('watchlist >> AddToWatchlist >> : ', watchlist)
    useEffect(() => {
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])

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
