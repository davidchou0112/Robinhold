import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fromWatchList } from "../../store/actionWatchlist";

export default function DeleteFromWatchlist() {
    const dispatch = useDispatch();
    const { stockId } = useParams();

    const userId = useSelector(state => state.session.user.id)

    // const watchlist = useSelector(state => state.session.user.watchlists)


    const deleteStock = async e => {
        e.preventDefault();

        await dispatch(fromWatchList(userId, stockId))
    }

    return (
        <button onClick={deleteStock} >Add to Lists</button>
    )
}



// const userId = useSelector(state => state.session.user.id)

// const watchlist = useSelector(state => state.watchlist.allWatchlists[watchlistId])


// useEffect(() => {
//     dispatch(getAllWatchlists(userId))
// }, [dispatch, userId])

// const stockToWatchlist = async e => {
//     e.preventDefault();
//     const updatedWatchlist = {
//         watchlist_id: watchlist.id,
//         stock_id: stockId,
//     }
//     await dispatch(toWatchList(stockId, watchlistId, updatedWatchlist))
//     await dispatch(getAllWatchlists(userId))
// }

// return (
//     <button className='add_button' onClick={stockToWatchlist} >Add Stock to List</button>
// )
