import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateCurrWatchlist } from "../../store/watchlists"

export default function UpdateWatchlistForm() {

    const dispatch = useDispatch()
    const [ name, setName ] = useState("")
    const [ errors, setErrors ] = useState([])

    const onSubmit = async e => {
        e.preventDefault()
        setErrors([])

        const newWatchlist = {
            name
        }

        await dispatch(updateCurrWatchlist(newWatchlist))
        
    }

    return (
        <div>
            <form>
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
