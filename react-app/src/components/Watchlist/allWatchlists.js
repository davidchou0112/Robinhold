import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { deleteSingleList, getAllWatchlists } from "../../store/watchlists"
import UpdateWatchlistModal from "../UpdateWatchlistModal"
import CreateWatchlistForm from "./createWatchlistForm"
import "./allWatchlists.css"

export default function Watchlists() {

    const [ listForm, setListform ] = useState(false)
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
        <div className="all-lists-container">
            <div id="list-general-header">
                <h3>Lists</h3>
                <div id="list-drop-down">
                    <button className="update-delete-button" onClick={()=>setListform(true)}>
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    {listForm && (
                        <div>
                            <CreateWatchlistForm setListform={setListform}/>
                        </div>
                    )}
                </div>
            </div>
            {allWatchlistsArr.map(watchlist => (
                <div key={watchlist.id} >
                    <div id="list-header-container">
                        <div>
                            <NavLink to={`/watchlists/${watchlist.id}`}
                                className="list-nav-links"
                                id="list-name">
                                {watchlist.name}
                            </NavLink>
                        </div>
                        <div>
                            <UpdateWatchlistModal watchlistId={watchlist.id}/>
                            <button
                                className="update-delete-button"
                                onClick={()=> dispatch(deleteSingleList(watchlist.id))}>
                                    Delete
                            </button>
                        </div>
                    </div>
                        {Object.values(watchlist.watched_stocks).map(stock => (
                            <div id="watched_stocks_container">
                                <li key={stock.id} id="single_watched_stock">
                                    <NavLink to={`/stocks/${stock.id}`} className="list-nav-links">
                                        {stock.name}
                                    </NavLink>
                                </li>
                                <div>{stock.price}</div>
                            </div>
                        ))}

                    <div id="list_items">

                    </div>

                </div>
            ))}
        </div>
    )
}
