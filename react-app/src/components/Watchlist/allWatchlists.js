import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { deleteSingleList, getAllWatchlists } from "../../store/watchlists"
import UpdateWatchlistModal from "../UpdateWatchlistModal"
import CreateWatchlistForm from "./createWatchlistForm"
import "./allWatchlists.css"
import AddToWatchlist from "./addToWatchlist"
import AllTransactions from "../Portfolio/AllTransactions"
export default function Watchlists() {
    const sessionUser = useSelector((state) => state.session.user)
    console.log('sessionUser', sessionUser)
    const [listForm, setListform] = useState(false)
    const dispatch = useDispatch()
    const allWatchlistsObj = useSelector(state => state.watchlist.allWatchlists)
    console.log(`111111111111`, allWatchlistsObj)
    const userId = useSelector(state => state.session.user.id)
    const allWatchlistsArr = Object.values(allWatchlistsObj)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~', allWatchlistsArr)
    const [showWLButton, setShowWLButton] = useState(true)
    const { stockId } = useParams();

    useEffect(() => {
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])

    function findMatchStock() {
        Object.values(watchlist.watched_stocks).forEach((ele)=> {
            if(ele.id === stockId) setShowWLButton(false)
        })
    }


    if (!allWatchlistsArr) return null
    let watchlist;
    // if (sessionUser) watchlist = Object.values(sessionUser).filter(watchlist => watchlist.watchlistId === sessionUser.watchlists.id['1'].watched_stocks['1'])
    console.log('watchlist', watchlist)
    return (
        <>
        <div className="all-lists-wrapper">
        <div className="all-lists-container">
            <div id="list-general-header">
                <h3>Lists</h3>
                <div id="list-drop-down">
                    <button className="update-delete-button" onClick={() => setListform(true)}>
                        <i class="fa-solid fa-plus"></i>
                    </button>
                    {listForm && (
                        <div>
                            <CreateWatchlistForm setListform={setListform} />
                        </div>
                    )}
                </div>
            </div >
            {allWatchlistsArr.map(watchlist => (
                <div className='stocks_in_list' key={watchlist.id} >
                    <div id="list-header-container">
                        <div>
                            {watchlist.name}
                            {/* <NavLink to={`/watchlists/${watchlist.id}`}
                                className="list-nav-links"
                                id="list-name">
                                {watchlist.name}
                            </NavLink> */}
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
                    {Object.values(watchlist.watched_stocks).map(stock => (
                        <div id="watched_stocks_container">
                            <li key={stock.id} id="single_watched_stock">
                                <NavLink to={`/stocks/${stock.id}`} className="list-nav-links">
                                    {stock.name}
                                </NavLink>
                            </li>
                            <div>{stock.price}</div>
                        </div>
                    ))
                }
                {/* {Object.values(watchlist.watched_stocks).forEach((ele)=> {
                     if(ele.id === stockId) setShowWLButton(false)
                })} */}


                    {/* {sessionUser && !watchlist.length !== sessionUser?.id && (<AddToWatchlist />)} */}

                    {!Object.keys(watchlist.watched_stocks).includes(stockId) && stockId && stockId && watchlist.id && (
                        <AddToWatchlist watchlistId={watchlist.id} />
                    )}

                    <div id="list_items">

                    </div>



                </div>
            ))}
        </div>
        <AllTransactions />
        </div>
        </>

    )
}
