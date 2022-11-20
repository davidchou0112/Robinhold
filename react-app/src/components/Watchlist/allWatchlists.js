import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams, Link } from "react-router-dom"
import { deleteSingleList, getAllWatchlists } from "../../store/watchlists"
import UpdateWatchlistModal from "../UpdateWatchlistModal"
import CreateWatchlistForm from "./createWatchlistForm"
import "./allWatchlists.css"
import AddToWatchlist from "./addToWatchlist"

export default function Watchlists() {

    const [listForm, setListform] = useState(false)

    const dispatch = useDispatch()
    const allWatchlistsObj = useSelector(state => state.watchlist.allWatchlists)
    const userId = useSelector(state => state.session.user.id)

    const { stockId } = useParams();

    useEffect(() => {
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])


    if (!allWatchlistsObj) return null
    const allWatchlistsArr = Object.values(allWatchlistsObj)

    return (
        <div className="all-lists-container">
            <div id="list-general-header">
                <h3>Lists</h3>
                <div id="list-drop-down">
                    <button className="update-delete-button" onClick={() => setListform(true)}>
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div >
            {listForm && (
                <div>
                    <CreateWatchlistForm setListform={setListform} />
                </div>
            )}
            {allWatchlistsArr.map(watchlist => (
                <div className='stocks_in_list' key={watchlist.id} >
                    <div id="list-header-container">
                        <div>
                            <NavLink to={`/watchlists/${watchlist.id}`}
                                className="list-nav-links"
                                id="list-name">
                                {watchlist.name}
                            </NavLink>
                        </div>
                        <div>
                            <UpdateWatchlistModal watchlistId={watchlist.id} />
                            <button
                                className="watchlist-page-icon"
                                onClick={() => dispatch(deleteSingleList(watchlist.id))}>
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    {watchlist.watched_stocks && Object.values(watchlist.watched_stocks)?.map(stock => (
                        <Link to={`/stocks/${stock.id}`} id="link-to-single-stock">
                            <div id="watched_stocks_container">
                                <div>{stock.name}</div>
                                <div>{stock.price}</div>
                            </div>
                        </Link>
                    ))}

                    {/* {sessionUser && !watchlist.length !== sessionUser?.id && (<AddToWatchlist />)} */}
                    { !Object.keys(watchlist.watched_stocks).includes(stockId) && stockId && watchlist.id && (
                        <AddToWatchlist watchlistId={watchlist.id} />
                    )}
                </div>
            ))}
        </div>
    )
}
