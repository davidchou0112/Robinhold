// ========== CONSTANTS ==========
const ADD_TO_WATCHLIST = 'addToWatchlist/addToWatchlist';
const DELETE_FROM_WATCHLIST = ''

// ========== REGULAR ACTION CREATOR ==========
const addToWatchlist = (userId, stockId, watchlist) => {
    return {
        type: ADD_TO_WATCHLIST,
        userId,
        stockId,
        watchlist
    }
}

// ========== THUNK ===========
export const toWatchList = (userId, stockId, watchlist) => async (dispatch) => {
    const response = await fetch(`/stocks/${stockId}`, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    if (response.ok) {
        const newWatchlist = await response.json()
        dispatch(addToWatchlist(newWatchlist, userId, stockId))
    }
}

// export const

// ========== STATE & REDUCER ===========
const initialState = { allWatchlists: {}, singleWatchlist: {} }
const addedToWatchlist = (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_WATCHLIST:
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

export default addedToWatchlist;