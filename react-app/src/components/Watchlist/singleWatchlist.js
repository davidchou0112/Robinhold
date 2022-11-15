import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSingleWatchlist } from "../../store/watchlists";


export default function SingleWatchlist() {
    const dispatch = useDispatch()
    const { watchlistId } = useParams()
    const watchlistObj = useSelector(state => state.session.user.watchlists[watchlistId])
    // console.log("testing to get watchlistobj",watchlistObj)
    const watched_stocks = Object.values(watchlistObj.watched_stocks)
    // console.log(watched_stocks)

    useEffect(() => {
        dispatch(getSingleWatchlist(watchlistId))
    }, [dispatch, watchlistId])

    return (
        <div>
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
                                <td>{stock.id}</td>
                            </NavLink>
                            <td>{stock.symbol}</td>
                            <td>{stock.price}</td>
                        </tr>
                    ))}
                </tbody>

                {/* <tr>
                        {watched_stocks.map(stock => (
                            <NavLink to={`/stocks/${stock.id}`}>
                                <td>{stock.name}</td>
                                <td>{stock.symbol}</td>
                                <td>{stock.price}</td>
                            </NavLink>
                        ))}
                    </tr> */}
                <tr>

                </tr>

                <tbody>

                </tbody>
            </table>
        </div>
    )
}
