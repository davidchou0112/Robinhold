const LOAD_WATCHLISTS = "watchlists/loadWatchlists"

const loadWatchlists = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}




const initialState = {}
const watchlistsReducer = (state=initialState, action) =>{
    switch (action.type) {
        case LOAD_WATCHLISTS:
            return { watchlists: action.watchlists }

        default:
            return state
    }
}

export default watchlistsReducer;
