import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getSingleWatchlist } from "../../store/watchlists";


export default function SingleWatchlist(){
    const dispatch = useDispatch()
    const { watchlistId } = useParams()
    const watchlistObj = useSelector(state => state.session.user.watchlists[watchlistId])
    console.log("testing to get watchlistobj",watchlistObj)
    const watched_stocks = Object.values(watchlistObj.watched_stocks)
    console.log(watched_stocks)

    useEffect(()=>{
        dispatch(getSingleWatchlist(watchlistId))
    }, [dispatch, watchlistId])

    return (
        <div>
            {watched_stocks.map(stock => (
                <div key={stock.id}>
                    <NavLink to={`/stocks/${stock.id}`}>
                        {stock.symbol}
                        ${stock.price}
                    </NavLink>
                </div>
            ))}
        </div>
    )
}
