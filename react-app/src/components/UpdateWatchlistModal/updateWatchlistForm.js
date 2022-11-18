import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllWatchlists, updateCurrWatchlist } from "../../store/watchlists"
import "./updateWatchlistForm.css"

export default function UpdateWatchlistForm({watchlistId,setShowModal}) {

    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state=> state.session.user.id)
    const [ name, setName ] = useState("")
    const [ errors, setErrors ] = useState([])

    // console.log("~~~~~~~~~~~",watchlistId)

    const onSubmit = async e => {
        e.preventDefault()
        setErrors([])

        const newWatchlist = {
            name
        }

        await dispatch(updateCurrWatchlist(watchlistId, newWatchlist))
        await dispatch(getAllWatchlists(userId))
        setShowModal(false)
        history.push('/')

    }

    return (
        <div className="update-watchlist-form-container">
            <form onSubmit={onSubmit} id="update-watchlist-form">
                <ul>
                    {errors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
                <div id="update-form-inside">
                    <input placeholder="Name"
                        required
                        type={'text'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id="updated-input"
                    />
                    <button type="submit"
                        className="watchlist-page-button"
                        id="watchlist-update-submit-btn"
                    >Save</button>
                </div>
            </form>
        </div>
    )
}
