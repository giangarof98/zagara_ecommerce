import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

let initialState = {
    cartItems: cartItemsFromStorage
};

//const middleware = [thunk];

const store = configureStore({
    reducer,
    initialState,
    preloadedState: {},
    //composeWithDevTools(applyMiddleware(...middleware))
    middleware: [thunk]
})

export default store;