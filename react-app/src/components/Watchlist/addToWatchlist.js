import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { toWatchList } from "../../store/actionWatchlist"

export default function AddToWatchlist() {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    console.log('stockId >> AddToWatchlist >> : ', stockId)
    const userId = useSelector(state => state.session.user.id)
    console.log('userId >> AddToWatchlist >> : ', userId)
    const watchlist = useSelector(state => state.session.user.watchlists)
    console.log('watchlist >> AddToWatchlist >> : ', watchlist)

    const stockToWatchlist = async e => {
        e.preventDefault();
        const updatedWatchlist = {
            name: watchlist['1'].name
        }
        dispatch(toWatchList(updatedWatchlist, userId, stockId))
    }

    return (
        <button onClick={stockToWatchlist} >Add to Lists</button>
    )
}

