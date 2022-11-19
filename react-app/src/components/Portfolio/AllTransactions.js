import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "../Watchlist/singleWatchlist.css"
import { fetchUserTransactions } from "../../store/transactions"





export default function AllTransactions() {
    const sessionUser = useSelector((state) => state.session.user)
    const [listForm, setListform] = useState(false)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const [showWLButton, setShowWLButton] = useState(true)
    const { stockId } = useParams();
    const userTransactions = useSelector(state=>Object.values(state.transaction.transactions))

    useEffect(() => {
        dispatch(fetchUserTransactions(userId))
    }, [dispatch, userId])




    return (
        <div className="all-lists-container">
            <div id="list-general-header">
                <h3>User Transcations</h3>
            </div >
                <div className='stocks_in_list'>
                    <div id="list-header-container">
                        <div>
                            Stock
                        </div>
                        <div>
                            Price per Share
                        </div>
                    </div>
                    {userTransactions.map(transaction => (
                        <div id="watched_trsc_container">
                            <li key={transaction.id} id="single_watched_stock">
                                    {transaction.stock_symbol}
                            </li>

                            <div>${transaction.price}</div>
                        </div>
                    ))}
                </div>

        </div>

    )

}
