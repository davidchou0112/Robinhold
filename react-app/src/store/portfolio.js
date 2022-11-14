// // ========== CONSTANTS ==========
// const GET_BUYING_POWER = 'portfolio/displayBuyingPower';

// // ========== REGULAR ACTION CREATOR ==========
// // buying power
// const displayBuyingPower = (userId) => {
//     return {
//         type: GET_BUYING_POWER,
//         userId
//     }
// }

// // ========== THUNK ACTION CREATOR ==========
// // buying power
// export const getBuyingPower = (userId) => async dispatch => {
//     const response = await fetch(`/`);
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(displayBuyingPower(data));
//     }
// }

// // ========== STATE OBJECT & REDUCER ==========
// const initialState = { buyingPower: {} };

// const portfolioReducer = (state = initialState, action) => {
//     let newState = {};
//     switch (action.type) {

//         case GET_BUYING_POWER:
//             let buyingPower = {};
//             newState = {
//                 ...state,
//                 buyingPower: { ...state.buyingPower }
//             }
//             newState.buyingPower = buyingPower
//             return newState

//         default:
//             return { ...state }
//     }
// }
// export default portfolioReducer;