// import React, { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useHistory } from "react-router-dom"
// import { getAllWatchlists, updateCurrWatchlist } from "../../store/watchlists"
// import "./updateWatchlistForm.css"

// export default function UpdateWatchlistForm({watchlistId,watchlistName, setShowModal}) {

//     const dispatch = useDispatch()
//     const history = useHistory()
//     const userId = useSelector(state=> state.session.user.id)
//     const [ name, setName ] = useState(watchlistName)
//     console.log(watchlistName)
//     const [ errors, setErrors ] = useState([])

//     // console.log("~~~~~~~~~~~",watchlistId)
//     // useEffect(()=> {
//     //     setName(watchlistName)
//     // },[watchlistName])

//     const onSubmit = async e => {
//         e.preventDefault()
//         setErrors([])

//         const newWatchlist = {
//             name
//         }

//         await dispatch(updateCurrWatchlist(watchlistId, newWatchlist))
//         await dispatch(getAllWatchlists(userId))
//         setShowModal(false)
//         history.push('/')

//     }

//     return (
//         <div className="update-watchlist-form-container">
//             {/* <h3>Edit List name</h3> */}
//             <form onSubmit={onSubmit} id="update-watchlist-form">
//                 <ul>
//                     {errors.map(err => (
//                         <li key={err}>{err}</li>
//                         ))}
//                 </ul>
//                 <div id="update-form-inside">
//                         <label id='formLabel'>Edit List Name</label>
//                     <input
//                         required
//                         type={'text'}
//                         value={name}
//                         onChange={e => setName(e.target.value)}
//                         id="updated-input"
//                         placeholder="edit the list name here"
//                     />
//                     <button type="submit"
//                         className="watchlist-page-button"
//                         id="watchlist-update-submit-btn"
//                     >Save</button>
//                 </div>
//             </form>
//         </div>
//     )
// }


import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { getAllWatchlists, updateCurrWatchlist } from "../../store/watchlists"
import "./updateWatchlistForm.css"

export default function UpdateWatchlistForm({ watchlistId, watchlistName, setShowModal }) {

    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const [name, setName] = useState(watchlistName)

    const [errors, setErrors] = useState([])

    // console.log("~~~~~~~~~~~",watchlistId)

    const onSubmit = async e => {
        e.preventDefault()
        if (name.length <= 25) {
            setErrors([])

            const newWatchlist = {
                name
            }
            await dispatch(updateCurrWatchlist(watchlistId, newWatchlist))
            await dispatch(getAllWatchlists(userId))
            setShowModal(false)
            history.push('/')
        }
        return setErrors(["Watchlist name must less than 26 charactors."])
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
                    <input
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
