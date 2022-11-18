// ========== CONSTANTS ==========
const ADD_TO_WATCHLIST = 'actionWatchlist/addToWatchlist';
const DELETE_FROM_WATCHLIST = 'actionWatchlist/deleteFromWatchlist'

// ========== REGULAR ACTION CREATOR ==========
const addToWatchlist = (stock) => {
    return {
        type: ADD_TO_WATCHLIST,
        stock
    }
}

const deleteFromWatchlist = (userId, stockId) => {
    return {
        type: DELETE_FROM_WATCHLIST,
        userId,
        stockId

    }
}

// ========== THUNK ===========
export const toWatchList = (stockId, watchlistId, updatedWatchlist) => async (dispatch) => {
    // const response = await fetch(`/watchlists/${watchlistId}/${stockId}`, {
    const response = await fetch(`/watchlists/add`, {

        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(updatedWatchlist)
    })
    if (response.ok) {
        const stock = await response.json()
        dispatch(addToWatchlist(stock))
        // return stock
    }
}

export const fromWatchList = (userId, watchlistId, stockId) => async (dispatch) => {
    // const response = await fetch(`/watchlists/${stockId}`, {
    const response = await fetch(`/watchlists/${watchlistId}/${stockId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        // const newWatchlist = await response.json()
        await dispatch(deleteFromWatchlist(userId, stockId))
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
                allWatchlists: {
                    ...state.allWatchlists,
                    ...action.stock
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
