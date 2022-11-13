// ========== CONSTANTS ==========

const GET_ALL_STOCKS = 'stocks/displayAllStocks';


// ========= REGULAR ACTION CREATOR ==========

// all stocks
const displayAllStocks = (stocks) => {
    return {
        type: GET_ALL_STOCKS,
        stocks
    }
}

// ========= THUNK ACTION CREATOR ==========

// all stocks
export const getAllStocks = () => async dispatch => {
    const response = await fetch(`/stocks`);
    console.log(response, 'this is response')
    if (response.ok) {
        const data = await response.json();
        dispatch(displayAllStocks(data));
    }
    else if (response.errors) {
        console.log('testing111')
    }
}

// ========== STATE OBJECT ==========

const initialState = { allStocks: {}, singleStock: {} };

const stocksReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {

        case GET_ALL_STOCKS:
            let allStocks = {};
            newState = {
                ...state,
                allStocks: { ...state.allStocks }
            }
            console.log(action, 'this is action')
            action.stocks.forEach(stock => {
                allStocks[stock.id] = stock;
            });
            newState.allStocks = allStocks
            return newState

        default:
            return { ...state };
    }
}
export default stocksReducer;
