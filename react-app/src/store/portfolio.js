// // ========== CONSTANTS ==========
// const GET_BUYING_POWER = 'portfolio/displayBuyingPower';
 const ADD_BUYING_POWER = 'portfolio/addBuyingPower'
// // ========== REGULAR ACTION CREATOR ==========
// // buying power
// const displayBuyingPower = (userId) => {
//     return {
//         type: GET_BUYING_POWER,
//         userId
//     }
// }
const addBuyingPower = (user) => {
    return {
        type: ADD_BUYING_POWER,
        user
    }
}

// // ========== THUNK ACTION CREATOR ==========
// // buying power
// export const getBuyingPower = (userId) => async dispatch => {
//     const response = await fetch(`/`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(displayBuyingPower(data));
//     }
// }
 export const addBuyingPowerThunk = (payload, userId) => async dispatch => {
    console.log('---------before hitting backend')
    const response = await fetch(`/users/${userId}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        console.log('-----------------after hitting backend')
        const newBuyingPower = await response.json()
        dispatch(addBuyingPower(newBuyingPower))
        return newBuyingPower
    }
    else {
        console.log('------------something wrong')
    }
}

// // ========== STATE OBJECT & REDUCER ==========
const initialState = { user: {} };

const portfolioReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case ADD_BUYING_POWER:
            newState = {...state, user:{...state.user}}
            newState.user = action.user
            return newState

        // case GET_BUYING_POWER:
        //     let buyingPower = {};
        //     newState = {
        //         ...state,
        //         buyingPower: { ...state.buyingPower }
        //     }
        //     newState.buyingPower = buyingPower
        //     return newState

        default:
            return { ...state }
    }
}
export default portfolioReducer;
