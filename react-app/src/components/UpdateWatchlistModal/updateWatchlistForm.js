import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllWatchlists, updateCurrWatchlist } from "../../store/watchlists"

export default function UpdateWatchlistForm({watchlistId}) {

    const dispatch = useDispatch()
    const [ name, setName ] = useState("")
    const [ errors, setErrors ] = useState([])
    const userId = useSelector(state=> state.session.user.id)

    const onSubmit = async e => {
        e.preventDefault()
        setErrors([])

        const newWatchlist = {
            name
        }

        await dispatch(updateCurrWatchlist(watchlistId, newWatchlist))
        await dispatch(getAllWatchlists(userId))

    }

    return (
        <div className="update_watchlist_form_container">
            <form onSubmit={onSubmit}>
                <ul>
                    {errors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
                <div>
                    <input placeholder="Name"
                        required
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Update Watchlist</button>
                </div>
            </form>
        </div>
    )
}
