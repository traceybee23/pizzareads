import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import booksReducer from './books';
import progressReducer from './progress';
import couponReducer from './coupons';
import userCouponReducer from './userCoupons';
import friendsReducer from './friends';
import reviewsReducer from './reviews';
import searchReducer from './search';

const rootReducer = combineReducers({
  // ADD REDUCERS HERE
  session: sessionReducer,
  books: booksReducer,
  progress: progressReducer,
  coupon: couponReducer,
  userCoupon: userCouponReducer,
  friends: friendsReducer,
  reviews: reviewsReducer,
  search: searchReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
