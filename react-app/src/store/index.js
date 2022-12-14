import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import stocksReducer from './stocks';
import portfolioReducer from './portfolio';
import watchlistsReducer from './watchlists';
import addedToWatchlist from './actionWatchlist';
import transactionReducer from './transactions';
const rootReducer = combineReducers({
  session,
  stocks: stocksReducer,
  portfolio: portfolioReducer,
  watchlist: watchlistsReducer,
  transaction: transactionReducer,
  addedToWatchlist: addedToWatchlist
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
