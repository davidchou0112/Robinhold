const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
const LOAD_SINGLEWATCHLIST = "waatchlists/loadSingleWatchlist"
const CREATE_WATCHLIST = "watchlists/createWatchlist"
const UPDATE_WATCHLIST = "watchlists/updateWatchlist"

const loadWatchlists = (watchlists) => {
    console.log('this is watchlists>>', watchlists)
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

const loadSingleWatchlist = (watchlist) => {
    return {
        type: LOAD_SINGLEWATCHLIST,
        watchlist
    }
}

const createNewWatchlist = (watchlist) => {
    return {
        type: CREATE_WATCHLIST,
        watchlist
    }
}

const updateWatchlist = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST,
        watchlist
    }
}



// ================= Thunk ==================
export const getAllWatchlists = (userId) => async (dispatch) => {
    // =============  not sure about path ==============
    const res = await fetch(`/users/${userId}/watchlists`)
    const data = await res.json()
    if (res.ok) {
        dispatch(loadWatchlists(data))
    }
}

export const getSingleWatchlist = (id) => async (dispatch) => {
    const res = await fetch(`/watchlists/${id}`)
    const data = await res.json()
    if (res.ok) {
        dispatch(loadSingleWatchlist(data))
    }
}

// -------------- Create new watchlist ---------------------
export const createWatchlist = (watchlist, userId) => async (dispatch) => {
    const res = await fetch(`/users/${userId}/watchlists`, {
        metnod: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    if ( res.ok ){
        const newWatchlist = await res.json()
        dispatch(createNewWatchlist(newWatchlist,userId))
    }
}






const initialState = { allWatchlists: {}, singleWatchlist: {} }
const watchlistsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        case LOAD_WATCHLISTS:
            newState = { ...state, allWatchlists: {}, singleWatchlist: {} }
            Object.values(action.watchlists).map(watchlist => (
                newState.allWatchlists[watchlist.id] = { ...watchlist }
            ))
            return newState

        case LOAD_SINGLEWATCHLIST:
            newState = { allWatchlists: {}, singleWatchlist: {} }
            newState.singleWatchlist = action.watchlist
            return newState

        case CREATE_WATCHLIST:
            return {
                ...state,
                allWatchlists: {
                    ...state.allWatchlists,
                    ...action.watchlist
                },
                singleWatchlist: {}
            }



        default:
            return state
    }
}

export default watchlistsReducer;
