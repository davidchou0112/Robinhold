const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
const LOAD_SINGLEWATCHLIST = "waatchlists/loadSingleWatchlist"
const CREATE_WATCHLIST = "watchlists/createWatchlist"


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



// ================= Thunk ==================
export const getAllWatchlists = (userId) => async (dispatch) => {
    // =============  not sure about path ==============
    const res = await fetch(`/users/${userId}/watchlists`)
    const data = await res.json()
    // console.log("!!!!!!!!!!here is the thunk", data)

    if (res.ok) {
        dispatch(loadWatchlists(data))
    }
    console.log('~~~~~~~~~~', loadWatchlists(data))
}

export const getSingleWatchlist = (id) => async (dispatch) => {
    const res = await fetch(`/watchlists/${id}`)
    const data = await res.json()
    // console.log("=======get single watchlist",data)

}

// -------------- Create new watchlist ---------------------
export const createWatchlist = (watchlist, userId) => async (dispatch) => {
    const res = await fetch(`/users/${userId}/watchlists`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    console.log("?????????????", res)

}


const initialState = { allWatchlists: {}, singleWatchlist: {} }
const watchlistsReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
        // case LOAD_WATCHLISTS:
        //     newState = { ...state, allWatchlists: {}, singleWatchlist: {} }
        //     console.log("===========action here", action)
        //     console.log('~~action.watchlists~~~', action.watchlists)
        //     console.log('Object.values of action.watchlists', Object.values(action.watchlists))
        //     Object.values(action.watchlists).map(watchlist => (
        //         newState.allWatchlists[watchlist.id] = { ...watchlist }
        //     ))
        //     return newState
        case LOAD_WATCHLISTS:
            console.log('newState.allWatchlists', newState.allWatchlists)
            newState = {
                ...state,
                allWatchlists: { ...action.watchlists }
            }
            console.log('this is action.watchlists >>:', action.watchlists)
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
