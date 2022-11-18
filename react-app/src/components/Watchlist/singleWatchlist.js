import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSingleList, getAllWatchlists, getSingleWatchlist } from "../../store/watchlists";
import "./singleWatchlist.css"

export default function SingleWatchlist() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { watchlistId } = useParams()
    const watchlistObj = useSelector(state => state.session.user.watchlists[watchlistId])
    const watched_stocks = Object.values(watchlistObj.watched_stocks)
    const userId = useSelector(state => state.session.user.id)


    // const handleDelete = () => {
    //     dispatch(deleteSingleList(watchlistId))
    //     history.push("/watchlists")
    // }

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
    }, [dispatch, watchlistId])

    return (
        <div id="single-watchlist-container">
            <div id="single-watchlist-title">
                <h2>{watchlistObj.name}</h2>
                <button className="watchlist-page-icon" onClick={()=>handleDelete()}>
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
            {watched_stocks.length} items
            <table id="single-watchlist-table">
                <thead>
                    <tr className="table-row-container">
                        <div className="single-watchlist-table-name-column">
                            <th>Name</th>
                        </div>
                        <div className="table-symbol-price-columns">
                            <th>Symbol</th>
                            <th id="price-in-single-list">Price</th>
                        </div>
                    </tr>
                </thead>
                <tbody>
                    {watched_stocks.map(stock => (
                        <tr key={stock.id} className="table-row-container" id="each-single-stock">
                            <div className="single-watchlist-table-name-column">
                                <td>{stock.name}</td>
                            </div>
                            <div className="table-symbol-price-columns">
                                <td>{stock.symbol}</td>
                                <td>${stock.price}</td>
                            </div>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
