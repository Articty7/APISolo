import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


//ROOT REDUCER
const rootReducer = combineReducers({
    // No reducers yet, keep this empty for now
  });

//ENCHANCER
  let enhancer;

if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);  // Only use thunk in production
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // Use Redux DevTools if available
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));  // Use both thunk and logger in development
}

//CONFIGURESTORE

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };



  //EXPORTS
  export default configureStore;
