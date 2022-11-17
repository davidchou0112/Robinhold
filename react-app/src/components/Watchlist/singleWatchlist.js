import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteSingleList, getAllWatchlists, getSingleWatchlist } from "../../store/watchlists";


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
            history.push("/watchlists")
        }
    }

    useEffect(() => {
        dispatch(getSingleWatchlist(watchlistId))
    }, [dispatch, watchlistId])

    return (
        <div>
            <h2>{watchlistObj.name}</h2>
            <button onClick={()=>handleDelete()}>Delete</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {watched_stocks.map(stock => (
                        <tr key={stock.id}>
                            <NavLink to={`/stocks/${stock.id}`}>
                                <td>{stock.name}</td>
                            </NavLink>
                            <td>{stock.symbol}</td>
                            <td>{stock.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
