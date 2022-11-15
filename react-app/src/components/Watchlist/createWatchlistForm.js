import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { createWatchlist } from "../../store/watchlists"

export default function CreateWatchlistForm(){

    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [errors, setErrors] = useState([])
    const { userId } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()
        const newWatchlist = {
            name
        }

        let createdList = await dispatch(createWatchlist(newWatchlist, userId))
            .catch(async(res)=> {
                const data = await res.json()
                if (data && data.errors) setErrors(data.errors)
            })
        if(createdList){
            setErrors([])
        }
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
                        onChange={e=> setName(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Create Watchlist</button>
                </div>
            </form>
        </div>
    )
}
