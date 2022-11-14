const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
const CREATE_WATCHLIST = "watchlists/createWatchlist"


const loadWatchlists = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

const createWatchlist = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist
    }
}



// ================= Thunk ==================
export const getAllWatchlists = () => async (dispatch) => {
    // =============  not sure about path ==============
    // const res = await fetch(`/users/${userId}/watchlists`)
    // const data = res.json()
    // console.log(res)

}



const initialState = {allWatchlists:{}, singleWatchlist:{}}
const watchlistsReducer = (state=initialState, action) =>{
    let newState
    switch (action.type) {
        case LOAD_WATCHLISTS:
            newState = { allWatchlists:{}, singleWatchlist:{} }
            action.watchlists.forEach(watchlist => (
                newState.allWatchlists[watchlist.id] = {...watchlist}
            ))
            return newState

            default:
            return state
    }
}

export default watchlistsReducer;
