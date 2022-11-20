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
                    <thead >
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
        // loaded &&
        //         <div id="single-watchlist-container">
        //         <div id="single-watchlist-title">
        //             <h2>{watchlistObj.name}</h2>
        //             <button className="watchlist-page-icon" onClick={()=>handleDelete()}>
        //                 <i class="fa-solid fa-trash-can"></i>
        //             </button>
        //         </div>
        //         <div>
        //             {watched_stocks.length} items
        //         </div>
        //         <table>
        //             <thead>
        //                 <tr className="table-row-container">
        //                     <th>Name</th>
        //                     <th>Symbol</th>
        //                     <th colSpan={"2"}>Price</th>
        //                 </tr>
        //             </thead>

        // )
        // //     <div id="single-watchlist-container">
        // //         <div id="single-watchlist-title">
        // //             <h2>{watchlistObj.name}</h2>
        // //             <button className="watchlist-page-icon" onClick={()=>handleDelete()}>
        // //                 <i class="fa-solid fa-trash-can"></i>
        // //             </button>
        // //         </div>
        // //         <div>
        // //             {watched_stocks.length} items
        // //         </div>
        // //         <table>
        // //             <thead>
        // //                 <tr className="table-row-container">
        // //                     <th>Name</th>
        // //                     <th>Symbol</th>
        // //                     <th colSpan={"2"}>Price</th>
        // //                 </tr>
        // //             </thead>
        // //                 {watched_stocks.map(stock => (
        //             <div id="test">
        //                 <div id="test">
        //                     <div>{stock.name}</div>
        //                     <div>{stock.symbol}</div>
        //                     <div>{stock.price}</div>
        //                 </div>
        //                     <div>
        //                         <button onClick={()=>dispatch(fromWatchList(userId, watchlistId, stock.id))} >
        //                                                 <i class="fa-solid fa-x"></i></button>
        //                     </div>
        //             </div>
        //                 ))}
        //             {/* <tbody>
        //                     <tr>
        //                         <td>{stock.name}</td>
        //                         <td>{stock.symbol}</td>
        //                         <td>{stock.price}</td>
        //                         <td>test</td>
        //                     </tr>
        //             </tbody> */}
        //         </table>
        //         <table id="single-watchlist-table">
        //             <thead>
        //                 <tr className="table-row-container">
        //                     <div className="table-name-column">
        //                         <th>Name</th>
        //                     </div>
        //                     <div className="table-symbol-columns">
        //                         <th>Symbol</th>
        //                     </div>
        //                     <div className="table-price-columns">
        //                         <th>Price</th>
        //                     </div>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 <div className="table-row-container">
        //                     {watched_stocks.map(stock => (
        //                         <div>
        //                             <a href={`/stocks/${stock.id}`} id="single-watched-stock-column">
        //                                 <tr key={stock.id} className="table-row-container" id="each-single-stock">
        //                                     <div className="table-name-column">
        //                                         <td>{stock.name}</td>
        //                                     </div>
        //                                     <div className="table-symbol-columns">
        //                                         <td>{stock.symbol}</td>
        //                                     </div>
        //                                     <div className="table-price-columns">
        //                                         <td>${stock.price}</td>
        //                                     </div>
        //                                 </tr>
        //                             </a>
        //                             <button onClick={()=>dispatch(fromWatchList(userId, watchlistId, stock.id))} >
        //                                                 <i class="fa-solid fa-x"></i></button>
        //                         </div>
        //                     ))}
        //                 </div>
        //             </tbody>
        //         </table>
        //     </div>
