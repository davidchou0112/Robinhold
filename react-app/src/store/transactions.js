// --------------------------constannts-----------------------------
const GET_USER_TRANSACTION  = 'portfolio/getUserTransaction'


// ------------------------actions-------------------------------

const getUserTransaction = (transactions) => {
    return {
        type: GET_USER_TRANSACTION,
        transactions
    }
}



// ---------------------------thunks----------------------------


export const fetchUserTransactions = (userId) => async (dispatch) => {
    // console.log('response-------------')
    const response = await fetch(`/users/${userId}/transactions`)
    if(response.ok) {
        const transactions = await response.json()
        dispatch(getUserTransaction(transactions))
        return transactions
    }
}




// ---------------------------reducer----------------------------
const initialState = {}

const transactionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_USER_TRANSACTION:
        newState = {...state}
        action.transactions.forEach((transaction)=>(newState[transaction.id]=transaction))
        return newState

        default:
            return state
    }
}

export default transactionReducer
