// ========== CONSTANTS ==========
const ADD_TO_WATCHLIST = 'actionWatchlist/addToWatchlist';
const DELETE_FROM_WATCHLIST = 'actionWatchlist/deleteFromWatchlist'

// ========== REGULAR ACTION CREATOR ==========
const addToWatchlist = (userId, stockId, watchlist) => {
    return {
        type: ADD_TO_WATCHLIST,
        userId,
        stockId,
        watchlist
    }
}

const deleteFromWatchlist = (userId, stockId, watchlist) => {
    return {
        type: DELETE_FROM_WATCHLIST,
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

export const fromWatchList = (userId, stockId, watchlist) => async (dispatch) => {
    const response = await fetch(`/stocks/${stockId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    if (response.ok) {
        const newWatchlist = await response.json()
        dispatch(deleteFromWatchlist(newWatchlist, userId, stockId))
    }
}

// export const

// ========== STATE & REDUCER ===========
const initialState = { allWatchlists: {}, singleWatchlist: {} }
const addedToWatchlist = (state = initialState, action) => {

    let newState = {};
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

        case DELETE_FROM_WATCHLIST:
            newState = {
                singleWatchlist: {},
                allWatchlists: { ...state.allWatchlists }
            }
            delete newState.allWatchlists[action.watchlistId]
            return newState

        default:
            return state
    }
}

export default addedToWatchlist;