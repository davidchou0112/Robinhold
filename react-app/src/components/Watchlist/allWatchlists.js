import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { deleteSingleList, getAllWatchlists } from "../../store/watchlists"
import UpdateWatchlistModal from "../UpdateWatchlistModal"
import CreateWatchlistForm from "./createWatchlistForm"
// import SingleWatchlist from "./singleWatchlist"


export default function Watchlists() {
    const dispatch = useDispatch()
    const allWatchlistsObj = useSelector(state => state.watchlist.allWatchlists)
    // console.log(allWatchlistsObj)
    const userId = useSelector(state => state.session.user.id)
    const allWatchlistsArr = Object.values(allWatchlistsObj)

    useEffect(() => {
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])

    if(!allWatchlistsArr) return null

    return (
        <div>
            {allWatchlistsArr.map(watchlist => (
                <div key={watchlist.id}>
                    <NavLink to={`/watchlists/${watchlist.id}`}>
                        {watchlist.id}
                        {watchlist.name}
                    </NavLink>
                    <UpdateWatchlistModal watchlistId={watchlist.id}/>
                    <button onClick={()=> dispatch(deleteSingleList(watchlist.id))}>Delete</button>
                </div>
            ))}
            <CreateWatchlistForm />
        </div>
    )
}
