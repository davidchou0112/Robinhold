import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getAllWatchlists } from "../../store/watchlists"
import CreateWatchlistForm from "./createWatchlistForm"
import SingleWatchlist from "./singleWatchlist"


export default function Watchlists(){
    const dispatch = useDispatch()
    const allWatchlistsObj = useSelector(state => state.session.user.watchlists)
    console.log(allWatchlistsObj)
    const userId = useSelector(state => state.session.user.id)
    const allWatchlistsArr = Object.values(allWatchlistsObj)
    console.log(allWatchlistsArr)

    // const watched_stocks = Object.values(allWatchlistsArr[3])
    // console.log(watched_stocks)

    useEffect(()=>{
        dispatch(getAllWatchlists(userId))
    }, [dispatch, userId])

    return (
        <div>
            {allWatchlistsArr.map(watchlist => (
                <div key={watchlist.id}>
                    <NavLink to={`/watchlists/${watchlist.id}`}>
                        {watchlist.id}
                        {watchlist.name}
                    </NavLink>
                </div>
            ))}
            <CreateWatchlistForm />
        </div>
    )
}
