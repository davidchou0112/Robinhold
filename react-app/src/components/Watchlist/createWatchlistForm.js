// import { useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { useHistory } from "react-router-dom"
// import { createWatchlist, getAllWatchlists } from "../../store/watchlists"
// import "./createWatchlistForm.css"

// export default function CreateWatchlistForm({setListform}) {

//     const history = useHistory()
//     const dispatch = useDispatch()
//     const [name, setName] = useState("")
//     const [errors, setErrors] = useState([])
//     const userId = useSelector(state => state.session.user.id)

//     const handleSubmit = async e => {
//         e.preventDefault()
//         setName("")
//         setErrors([])
//         const newWatchlist = {
//             name
//         }

//         await dispatch(createWatchlist(newWatchlist, userId))
//         await dispatch(getAllWatchlists(userId))
//         history.push("/")
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <ul>
//                     {errors.map(err => (
//                         <li key={err}>{err}</li>
//                     ))}
//                 </ul>
//                 <div id="create-form-container">
//                     <div>
//                         <input placeholder="Name"
//                             required
//                             type={'text'}
//                             value={name}
//                             onChange={e => setName(e.target.value)}
//                             id="create-watchlist-name-input"
//                         />
//                     </div>
//                     <div id="watchlist-create-btn-container">
//                         <button className="watchlist-page-button" id="create-watchlist-cancel-btn" onClick={()=>setListform(false)}>Cancel</button>
//                         <button className="watchlist-page-button" id="create-watchlist-submit-btn" type="submit">Create List</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }


import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { createWatchlist, getAllWatchlists } from "../../store/watchlists"
import "./createWatchlistForm.css"

export default function CreateWatchlistForm({ setListform }) {

    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const userId = useSelector(state => state.session.user.id)

    const handleSubmit = async e => {
        e.preventDefault()

        if (name.length <= 25) {
            setName("")
            setErrors([])
            const newWatchlist = {
                name
            }

            await dispatch(createWatchlist(newWatchlist, userId))
            await dispatch(getAllWatchlists(userId))
            history.push("/")
        } else {
            return setErrors(["Your list name must be less than 26 characters."])
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(err => (
                        <li key={err}>{err}</li>
                    ))}
                </ul>
                <div id="create-form-container">
                    <div>
                        <input placeholder="Name"
                            required
                            type={'text'}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            id="create-watchlist-name-input"
                        />
                    </div>
                    <div id="watchlist-create-btn-container">
                        <button className="watchlist-page-button" id="create-watchlist-cancel-btn" onClick={() => setListform(false)}>Cancel</button>
                        <button className="watchlist-page-button" id="create-watchlist-submit-btn" type="submit">Create List</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
