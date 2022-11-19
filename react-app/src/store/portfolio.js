// // ========== CONSTANTS ==========
const GET_BUYING_POWER = 'portfolio/displayBuyingPower';

 const ADD_BUYING_POWER = 'portfolio/addBuyingPower'

// // ========== REGULAR ACTION CREATOR ==========
// // buying power
const displayBuyingPower = (user) => {
    return {
        type: GET_BUYING_POWER,
        user
    }
}

const addBuyingPower = (user) => {
    return {
        type: ADD_BUYING_POWER,
        user
    }
}

// // ========== THUNK ACTION CREATOR ==========
// // buying power
export const getBuyingPower = (userId) => async dispatch => {
    const response = await fetch(`/api/users/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(displayBuyingPower(data));
    }
}

 export const addBuyingPowerThunk = (payload, userId) => async dispatch => {
    console.log('---------before hitting backend')
    const response = await fetch(`/api/users/${userId}`, {
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
            // newState = {user:{...state.user}}
            newState = {user: {}}
            newState.user = action.user
            return newState

        case GET_BUYING_POWER:
            newState = {user:{}}
            newState.user = action.user
            return newState

        default:
            return { ...state }
    }
}
export default portfolioReducer;
