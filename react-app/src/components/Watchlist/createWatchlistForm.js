import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createWatchlist, getAllWatchlists } from "../../store/watchlists"

export default function CreateWatchlistForm({setListform}) {

    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const userId = useSelector(state => state.session.user.id)

    const handleSubmit = async e => {
        e.preventDefault()
        setName("")
        setErrors([])
        const newWatchlist = {
            name
        }

        await dispatch(createWatchlist(newWatchlist, userId))
        await dispatch(getAllWatchlists(userId))
        history.push("/")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                    <button onClick={()=>setListform(false)}>Cancel</button>
                    <button type="submit">Create Watchlist</button>
                </div>
            </form>
        </div>
    )
}
