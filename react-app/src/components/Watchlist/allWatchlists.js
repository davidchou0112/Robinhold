import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { deleteSingleList, getAllWatchlists } from "../../store/watchlists"
import UpdateWatchlistModal from "../UpdateWatchlistModal"
import CreateWatchlistForm from "./createWatchlistForm"
import "./allWatchlists.css"

export default function Watchlists() {
    const dispatch = useDispatch()
    const allWatchlistsObj = useSelector(state => state.watchlist.allWatchlists)
    // console.log(allWatchlistsObj)
    const userId = useSelector(state => state.session.user.id)
    const allWatchlistsArr = Object.values(allWatchlistsObj)
    console.log(allWatchlistsArr)

    useEffect(() => {
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])

    if(!allWatchlistsArr) return null

    return (
        <div className="all_lists_container">
            <h3>Lists</h3>
            {allWatchlistsArr.map(watchlist => (
                <div key={watchlist.id} >
                    <div id="list_name">
                        <NavLink to={`/watchlists/${watchlist.id}`}>
                            {watchlist.name}
                        </NavLink>
                        {Object.values(watchlist.watched_stocks).map(stock => (
                            <div id="watched_stocks_container">
                                <li key={stock.id} id="single_watched_stock">
                                    <NavLink to={`/stocks/${stock.id}`}>
                                        {stock.name}
                                    </NavLink>
                                </li>
                            </div>
                        ))}
                        <UpdateWatchlistModal watchlistId={watchlist.id}/>
                        <button onClick={()=> dispatch(deleteSingleList(watchlist.id))}>Delete</button>
                    </div>
                    <div id="list_items">

                    </div>
                </div>
            ))}
            <CreateWatchlistForm />
        </div>
    )
}
