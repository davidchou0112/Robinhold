const LOAD_WATCHLISTS = "watchlists/loadWatchlists"
const LOAD_SINGLEWATCHLIST = "waatchlists/loadSingleWatchlist"
const CREATE_WATCHLIST = "watchlists/createWatchlist"


// const loadWatchlists = (watchlists) => {
//     return {
//         type: LOAD_WATCHLISTS,
//         watchlists
//     }
// }

// const loadSingleWatchlist = (watchlist) => {
//     return {
//         type: LOAD_SINGLEWATCHLIST,
//         watchlist
//     }
// }

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
    const data = res.json()
    // console.log("!!!!!!!!!!here is the thunk",data)

    // if (res.ok){
    //     dispatch(loadWatchlists(data))
    // }
}

export const getSingleWatchlist = (id) => async(dispatch) => {
    const res = await fetch(`/watchlists/${id}`)
    const data = res.json()
    // console.log("=======get single watchlist",data)

}

// -------------- Create new watchlist ---------------------
export const createWatchlist = (watchlist, userId) => async(dispatch) => {
    const res = await fetch(`/users/${userId}/watchlists`, {
        metnod: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(watchlist)
    })
    console.log("?????????????",res)

}


const initialState = {allWatchlists:{}, singleWatchlist:{}}
const watchlistsReducer = (state=initialState, action) =>{
    let newState
    switch (action.type) {
        // case LOAD_WATCHLISTS:
        //     newState = { allWatchlists:{}, singleWatchlist:{} }
        //     // console.log("===========action here",action)

        //     action.watchlists.forEach(watchlist => (
        //         newState.allWatchlists[watchlist.id] = {...watchlist}
        //     ))
        //     return newState

        // case LOAD_SINGLEWATCHLIST:
        //     newState = { allWatchlists:{}, singleWatchlist:{} }
        //     newState.singleWatchlist = action.watchlist
        //     return newState

        case CREATE_WATCHLIST:
            return {
                ...state,
                allWatchlists: {
                    ...state.allWatchlists,
                    ...action.watchlist
                },
                singleWatchlist:{}
            }



            default:
            return state
    }
}

export default watchlistsReducer;
