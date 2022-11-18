// --------------------------constannts-----------------------------
const GET_USER_TRANSACTION  = 'portfolio/getUserTransaction'
const CREATE_TRANSACTION = "portfolio/createUserTransaction"

// ------------------------actions-------------------------------

const getUserTransaction = (transactions) => {
    return {
        type: GET_USER_TRANSACTION,
        transactions
    }
}

const createNewTransaction = (transaction) => {
    return {
        type: CREATE_TRANSACTION,
        transaction
    }
}


// ---------------------------thunks----------------------------


export const fetchUserTransactions = (userId) => async (dispatch) => {
    // console.log('response-------------')
    const response = await fetch(`/users/${userId}/transactions`)
    const data = await response.json()
    if(response.ok) {
        dispatch(getUserTransaction(data))
        // return transactions
    }
}

export const createTransaction = (transaction, userId) => async (dispatch) => {
    const res = await fetch(`/users/${userId}/transactions`, {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(transaction)
    })
    if (res.ok) {
        console.log('got into thunk')
        const newTransaction = await res.json()
        dispatch(createNewTransaction(newTransaction, userId))
        return newTransaction
    }
}



// ---------------------------reducer----------------------------
const initialState = { transactions: {} }

const transactionReducer = (state = initialState, action) => {
    let newState = {};
    switch(action.type) {
        case GET_USER_TRANSACTION:
            newState = {...state}
            Object.values(action.transactions).map(transaction => (newState.transactions[transaction.id] = {...transaction}))
        return newState

        case CREATE_TRANSACTION:
            newState = { ...state }
            let id = action.transaction.id
            newState.transactions[id] = action.transaction
            return newState

        default:
            return state
    }
}

export default transactionReducer
