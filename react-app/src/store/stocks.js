// ========== CONSTANTS ==========
const GET_ALL_STOCKS = 'stocks/displayAllStocks';
const GET_SINGLE_STOCK = 'stocks/displaySingleStock';


// ========= REGULAR ACTION CREATOR ==========
// all stocks
const displayAllStocks = (stocks) => {
    return {
        type: GET_ALL_STOCKS,
        stocks
    }
}

// single stocks
const displaySingleStock = (singleStock) => {
    return {
        type: GET_SINGLE_STOCK,
        singleStock
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

// single stock
export const getSingleStock = (stockId) => async dispatch => {
    const response = await fetch(`/stocks/${stockId}`);
    if (response.ok) {
        const data = await response.json();
        console.log('this is data__:', data)
        dispatch(displaySingleStock(data))
    }
}


// ========== STATE OBJECT & REDUCER ==========
const initialState = { allStocks: {}, singleStock: {} };

const stocksReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {

        // all stocks
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

        // single stock
        case GET_SINGLE_STOCK:
            newState = {
                ...state,
                singleStock: { ...action.singleStock }
            }
            return newState

        default:
            return { ...state };
    }
}
export default stocksReducer;
