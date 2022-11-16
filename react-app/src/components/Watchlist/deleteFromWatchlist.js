import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export default function DeleteFromWatchlist() {
    const dispatch = useDispatch();
    const { stockId } = useParams();
    console.log('stockId >> DeleteFromWatchlist >> : ', stockId)
    const userId = useSelector(state => state.session.user.id)
    console.log('userId >> DeleteFromWatchlist >> : ', userId)
    const watchlist = useSelector(state => state.session.user.watchlists)
    console.log('watchlist >> DeleteFromWatchlist >> : ', watchlist)

    const deleteStock = async e => {
        e.preventDefault();
        const updatedWatchlist = {
            name: watchlist['1'].name
        }
        dispatch(toWatchList(updatedWatchlist, userId, stockId))
    }

    return (
        <button onClick={deleteStock} >Add to Lists</button>
    )
}
