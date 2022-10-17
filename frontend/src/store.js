import { combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import {
    productListReducer, 
    productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers';
import {
    userDetailsReducer, 
    userLoginReducer, 
    userRegisterReducer, 
    userUpdateReducer
} from './reducers/userReducers';

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    getMyOrderListReducer
} from './reducers/orderCreateReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: getMyOrderListReducer
    
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

let initialState = {
    //cartItems: cartItemsFromStorage,
    cart: { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage
    },
        userLogin: userInfoFromStorage,
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