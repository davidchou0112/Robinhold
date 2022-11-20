import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteSingleList, getAllWatchlists, getSingleWatchlist, fromWatchList } from "../../store/watchlists";
import "./singleWatchlist.css"
export default function SingleWatchlist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { watchlistId } = useParams()
    const [loaded, setLoaded] = useState(false)
    const watchlistObj = useSelector(state => state.watchlist.singleWatchlist)

    let watched_stocks
    const userId = useSelector(state => state.session.user.id)

    const handleDelete = async () => {
        const deleted = await dispatch(deleteSingleList(watchlistObj.id))
        dispatch(getAllWatchlists(userId))
        // console.log("=====================",deleted)
        if(deleted){
            history.push("/")
        }
    }

    useEffect(() => {
        dispatch(getSingleWatchlist(watchlistId))
        .then(()=>setLoaded(true))
    }, [dispatch, watchlistId])

    if(loaded){
        watched_stocks = Object.values(watchlistObj.watched_stocks)
    }

    return (
        loaded && (
            <div id="singleWatchlist-page-container">
                <div id="singleWatchlist-title-ctn">
                    <h2>{watchlistObj.name}</h2>
                    <button className="watchlist-page-icon" onClick={()=>handleDelete()}>
                         <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div id="singleWatchlist-numberOfItems">
                    {watched_stocks.length} items
                </div>
                <table id="singleWatchlist-table">
                    <thead>
                        <tr className="singleWatchlist-tr">
                            <th align="left" className="singleWatchlist-table-header">Name</th>
                            <th align="left" className="singleWatchlist-table-header">Symbol</th>
                            <th align="left" className="singleWatchlist-table-header">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watched_stocks.map(stock => (
                                <tr className="singleWatchlist-tr">
                                        <td className="singleWatchlist-table-row">{stock.name}</td>
                                        <td className="singleWatchlist-table-row">{stock.symbol}</td>
                                        <td className="singleWatchlist-table-row">${stock.price}</td>
                                    <td>
                                        <button onClick={()=>dispatch(fromWatchList(userId, watchlistId, stock.id))} >
                                                         <i class="fa-solid fa-x"></i></button>
                                    </td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    )
}
