import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { createWatchlist } from "../../store/watchlists"

export default function CreateWatchlistForm() {

    console.log('here i am')
    const dispatch = useDispatch()
    const [name, setName] = useState()
    const [errors, setErrors] = useState([])
    const { userId } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('123')
        const newWatchlist = {
            name
        }
        setErrors([])

        dispatch(createWatchlist(newWatchlist, userId))

        // return await dispatch(createWatchlist(newWatchlist, userId))
        //     .catch(async (res) => {
        //         // console.log("response from create list=========",createdList)
        //         const data = await res.json()
        //         if (data && data.errors) setErrors(data.errors)
        //     })
        // if (createdList) {
        // }
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
                    <button type="submit">Create Watchlist</button>
                </div>
            </form>
        </div>
    )
}
